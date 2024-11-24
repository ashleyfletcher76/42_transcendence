import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Chat extends Controller {
  @tracked messages = []; // Track incoming messages
  @tracked messageInput = '';
  /*
   * 1. Inject the websockets service
   */
  @service websockets;
  socketRef = null;

  queryParams = ['username'];

  username = null; // The query param will be injected here

  get username() {
    return this.username; // This is the query param username
  }
  constructor() {
    super(...arguments);

    /*
      2. The next step you need to do is to create your actual websocket. Calling socketFor
      will retrieve a cached websocket if one exists or in this case it
      will create a new one for us.
    */
    const socket = this.websockets.socketFor('ws://localhost:8888/');

    /*
      3. The next step is to define your event handlers. All event handlers
      are added via the `on` method and take 3 arguments: event name, callback
      function, and the context in which to invoke the callback. All 3 arguments
      are required.
    */
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);

    this.set('socketRef', socket);
  }

  myOpenHandler(event) {
    console.log(`On open event has been called: ${event}`);
  }

  myMessageHandler(event) {
    console.log(`Message: ${event.data}`);
    this.message = JSON.parse(event.data);
    this.messages = [...this.messages, this.message]; // Update the tracked array
    console.log(this.message.content);
  }

  myCloseHandler(event) {
    console.log(`On close event has been called: ${event}`);
  }

  @action
  sendMessage() {
    console.log(this.messageInput);
    let words = this.messageInput.trim().split(' ');
    let type = 'all';
    let user = 'all';
    let messageContent = this.messageInput;

    if (words[0].startsWith('/tournament')) {
      type = 'tournament';
      user = 'tournament';
      messageContent = words.slice(1).join(' ');
    } else if (words[0].startsWith('/')) {
      type = 'whisper';
      user = words[0].substring(1);
      messageContent = words.slice(1).join(' ');
    }
    if (this.messageInput.trim()) {
      this.socketRef.send(
        JSON.stringify({
          type: type,
          from: this.username,
          to: user,
          content: messageContent,
          timestamp: new Date().toISOString(),
        }),
      );
      this.messageInput = ''; // Clear input after sending
    }
  }

  @action
  updateInputValue(event) {
    this.messageInput = event.target.value; // Update the input value in the parent
  }
}
