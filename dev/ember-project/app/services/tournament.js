import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentService extends Service {
  @service websockets;
  @service user;

  @tracked currentLobby = null; // Current lobby details

  socketRef = null;

  @action
async connectToLobby(tournamentName) {
  const wsUrl = `ws://localhost:8003/ws/tournament/${tournamentName}/`;
  this.disconnectFromLobby(); // Disconnect from any existing lobby first
  this.socketRef = this.websockets.socketFor(wsUrl);

  // Register WebSocket event handlers
  this.socketRef.on('open', this.onOpen, this);
  this.socketRef.on('message', this.onMessage, this);
  this.socketRef.on('close', this.onClose, this);

  const data = {
    action: 'create_or_join',
    tournament_name: tournamentName,
    username: this.user.profile.nickname,
  };

  // Wait for the WebSocket to open before sending the data
  await this.waitForWebSocketOpen();
  this.sendMessage(data); // Send the join/create request
  this.currentLobby = tournamentName; // Track current lobby
}

async waitForWebSocketOpen() {
    return new Promise((resolve, reject) => {
      if (this.socketRef.readyState === WebSocket.OPEN) {
        // If already open, resolve immediately
        resolve();
      } else {
        // Otherwise, wait for the 'open' event
        const onOpen = () => {
          this.socketRef.off('open', onOpen); // Clean up the event listener
          resolve();
        };
  
        const onError = (error) => {
          this.socketRef.off('error', onError); // Clean up the error listener
          reject(new Error(`WebSocket failed to connect: ${error.message}`));
        };
  
        this.socketRef.on('open', onOpen);
        this.socketRef.on('error', onError);
      }
    });
  }
  

  @action
  disconnectFromLobby() {
    if (this.socketRef) {
      this.socketRef.off('open', this.onOpen, this);
      this.socketRef.off('message', this.onMessage, this);
      this.socketRef.off('close', this.onClose, this);
      this.socketRef.close();
      this.socketRef = null;
    }
    this.currentLobby = null;
  }

  sendMessage(data) {
    console.log("send tournament create");
    
    if (this.socketRef) {
      this.socketRef.send(JSON.stringify(data));
      console.log(data);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  onOpen(event) {
    console.log('WebSocket connection opened:', event);
  }

  onMessage(event) {
    console.log('WebSocket message received:', event.data);
    const parsedMessage = JSON.parse(event.data);
    this.messages = [...this.messages, parsedMessage];
  }

  onClose(event) {
    console.log('WebSocket connection closed:', event);
    this.currentLobby = null;
  }
}
