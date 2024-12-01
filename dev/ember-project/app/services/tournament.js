import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentService extends Service {
  @service websockets;
  @service user;
  @service session;
  
  @tracked currentLobby = null; // Current lobby details
  @tracked messages = [];
  @tracked currentPlayers = [];
  socketRef = null;

  @action
  async connectToLobby(tournamentName) {
    console.log("1");
    const token = this.session.data.authenticated.access;
    const wsUrl = `wss://localhost/ws/tournament/${tournamentName}/?token=${encodeURIComponent(token)}`;
    if (this.currentLobby)
      this.disconnectFromLobby(); // Disconnect from any existing lobby first
    this.socketRef = this.websockets.socketFor(wsUrl);
    console.log("2");

    // Register WebSocket event handlers
    this.socketRef.on('open', () => this.onOpen(tournamentName), this);
    this.socketRef.on('message', this.onMessage, this);
    this.socketRef.on('close', this.onClose, this);
  }

  @action
  async disconnectFromLobby() {
    if (this.socketRef) {
      // Remove event handlers
      this.socketRef.off('open', this.onOpen, this);
      this.socketRef.off('message', this.onMessage, this);
      this.socketRef.off('close', this.onClose, this);
      
      // Close WebSocket and wait for it to close
      this.socketRef.close();
      while (this.socketRef.readyState !== WebSocket.CLOSED) {
        console.log("closing");
        this.socketRef.close();
        await new Promise((resolve) => setTimeout(resolve, 50)); // Small delay to wait for closure
      }

      // Reset state
      this.socketRef = null;
    }
    this.onClose();
  }


  sendMessage(data) {
    if (this.socketRef) {
      this.socketRef.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  onOpen(tournamentName) {
    const data = {
      action: 'create_or_join',
      tournament_name: tournamentName,
      username: this.user.profile.nickname,
    };

    console.log('WebSocket connection opened:');
    this.sendMessage(data);
    this.currentLobby = tournamentName;
    console.log(this.currentLobby);
  }

  onMessage(event) {
    console.log('WebSocket message received:', event.data);
    const parsedMessage = JSON.parse(event.data);
    this.messages = [...this.messages, parsedMessage];
    if (parsedMessage.message === "Player added to the tournament.")
    {
      this.currentPlayers = [...this.currentPlayers, "user"];
    }
     
  }

  onClose(event) {
    console.log('WebSocket connection closed:', event);
    this.currentLobby = null;
  }
}
