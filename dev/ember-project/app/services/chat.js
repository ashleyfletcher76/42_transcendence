import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ChatService extends Service {
  @tracked messages = []; // Track incoming messages
  @tracked messageInput = ''; // Input field value
  @tracked inputColor = this.predefinedColors.all;

  @service user;
  @service websockets;
  @service session;
  @service tournament;

  socketRef = null;
  inputElement = null; // Reference to the input element
  type = "all";
  to_user = "";
  words = null;

  predefinedColors = {
    all: 'rgb(0 0 0)',
    tournament: 'rgb(30 218 55)',
    whisper: 'rgb(255 49 255)',
    system: 'rgb(130 140 55)'
  };

  setInputElement(element) {
    this.inputElement = element;
  }

  focusInput() {
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }

  constructor() {
    super(...arguments);

    // Initialize the WebSocket connection
    console.log("connect ...");
    const token = this.session.data.authenticated.access;
    const url = `wss://localhost/ws/chat/lobby/?token=${encodeURIComponent(token)}`;
    const socket = this.websockets.socketFor(url);

    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', this.myCloseHandler, this);

    this.socketRef = socket;
  }

  myOpenHandler(event) {
    console.log(`On open event has been called token: ${this.session.data.authenticated.access}`);
  }

  myMessageHandler(event) {
    console.log(`Message recieve: ${event.data}`);
    const newMessage = JSON.parse(event.data);
    this.messages = [...this.messages, newMessage]; // Add the new message to the tracked array
    console.log(newMessage.content);
  }

  myCloseHandler(event) {
    console.log(`On close event has been called: ${event}`);
  }
  
  updateInputValue(input) {
    this.messageInput = input; // Update the tracked input value
    this.words = this.messageInput.trim().split(' ');
    if (this.words[0] === '/*tournament') {
      this.type = 'tournament';
      this.to_user = 'tournament';
      this.inputColor =  this.predefinedColors.tournament;
    } else if (this.words[0] === '/*add') {
      this.type = 'add';
      this.to_user = this.words[1];
      this.inputColor =  this.predefinedColors.system;
    } else if (this.words[0] === '/*invite') {
      this.type = 'invite';
      this.to_user = this.words[1];
      this.inputColor =  this.predefinedColors.system;
    } else if (this.words[0].startsWith('/') && (this.words[0].length > 1) && (this.words[0][1] !== '*')) {
      this.type = 'whisper';
      this.to_user = this.words[0].substring(1);
      this.inputColor = this.predefinedColors.whisper;
    }
    else{
      this.type = 'all';
      this.inputColor = this.predefinedColors.all;
    }
  }

  sendMessage() {
    let messageContent = this.messageInput.trim();

    if (this.type !== "all"){
      messageContent = this.words.slice(1).join(' ');
    }
	  if (this.type === "tournament")
    {
      const data = {
				action: "message",
				sender: this.user.profile.nickname,
				message: messageContent,
				timestamp: new Date().toISOString(),
			  }
      this.tournament.sendMessage(data)
    }
    else if (messageContent && (this.to_user !== this.user.profile.nickname)) {
      this.socketRef.send(
        JSON.stringify({
          type: this.type,
          from: this.user.profile.nickname,
          to: this.to_user,
          content: messageContent,
          timestamp: new Date().toISOString(),
        }),
      );
    }
    if (this.type === "all")
      this.messageInput = '';
    else
      this.messageInput = this.words[0] + " ";
  }
}
