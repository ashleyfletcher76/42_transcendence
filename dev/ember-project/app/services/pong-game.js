import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PongGameService extends Service {
  @tracked leftPaddlePosition = 0.5; // Normalize between 0 and 1
  @tracked rightPaddlePosition = 0.5; // Normalize between 0 and 1
  @tracked ballPositionX = 0.5; // Ball position
  @tracked ballPositionY = 0.5; // Ball position
  @tracked winner;
  @tracked status;
  @tracked winnerSend;

  @tracked keyStates = {
    ArrowUp: false,
    ArrowDown: false,
    space: false,
    w: false,
    W: false,
    s: false,
    S: false,
  };

  @service gameData;
  @service session;
  @service tournament;
  @service user;
  @service router;
  @service websockets;

  socketRef = null;
  // Track the state of key presses
  p1UpKeyPressed = false;
  p1DownKeyPressed = false;
  p2UpKeyPressed = false;
  p2DownKeyPressed = false;

  constructor() {
    super(...arguments);
    this.setupKeyListeners();
  }

  get roomData() {
    return this.gameData.roomData; // Access shared room data
  }

  setupKeyListeners() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    let direction_p1 = '';
    let direction_p2 = '';
    let type_p1 = '';
    let type_p2 = '';
    let action = '';

    if (this.keyStates[event.key]) {
      return; // Key is already released; no need to resend the event
    }

    switch (event.key) {
      case 'ArrowUp':
        if (!this.keyStates.ArrowDown) {
          direction_p1 = 'up';
          type_p1 = 'start_move';
        } else return;
        break;
      case 'ArrowDown':
        if (!this.keyStates.ArrowUp) {
          direction_p1 = 'down';
          type_p1 = 'start_move';
        } else return;
        break;
      case 'w':
      case 'W':
        if (!this.keyStates.w && !this.keyStates.W) {
          direction_p2 = 'up';
          type_p2 = 'start_move';
        } else return;
        break;
      case 's':
      case 'S':
        if (!this.keyStates.s && !this.keyStates.S) {
          direction_p2 = 'down';
          type_p2 = 'start_move';
        } else return;
        break;
      case ' ':
      case 'Spacebar':
        if (!this.keyStates.space) {
          action = 'pause';
        } else return;
        break;
    }

    this.keyStates[event.key] = true;

    const data = {
      type_p1,
      direction_p1,
      type_p2,
      direction_p2,
      action,
    };
    this.sendMessage(data);
  }

  handleKeyUp(event) {
    let direction_p1 = '';
    let direction_p2 = '';
    let type_p1 = '';
    let type_p2 = '';
    let action = '';

    if (!this.keyStates[event.key]) {
      return; // Key is already released; no need to resend the event
    }

    switch (event.key) {
      case 'ArrowUp':
        type_p1 = 'stop_move';
        break;
      case 'ArrowDown':
        type_p1 = 'stop_move';
        break;
      case 'w':
      case 'W':
        type_p2 = 'stop_move';
        break;
      case 's':
      case 'S':
        type_p2 = 'stop_move';
        break;
    }

    this.keyStates[event.key] = false;

    const data = {
      type_p1,
      direction_p1,
      type_p2,
      direction_p2,
      action,
    };
    this.sendMessage(data);
  }

  updateGameState(data) {
    this.status = data.game_start_timer;
    this.ballPositionX = data.ball_x * 25;
    this.ballPositionY = data.ball_y * 24;
    this.leftPaddlePosition = data.left_paddle_y * 25;
    this.rightPaddlePosition = data.right_paddle_y * 25;
    this.winner = data.winner;
    this.gameData.left_score = data.left_score;
    this.gameData.right_score = data.right_score;
    if (this.winner && !this.winnerSend) {
      this.winnerSend = true;
      if (this.tournament.currentLobby) {
        //console.log('trans to tournament');
        //if (this.winner !== this.user.profile.nickname)
        //  this.tournament.playerInTournament = false;
        this.router.transitionTo('tournament');
      }
      this.willDestroy();
    }
  }

  willDestroy() {
    this.disconnectFromGame(this.gameData.roomData.room_name);
    this.winnerSend = false;
    //this.gameData.roomData = null;
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    super.willDestroy();
  }

  async connectToRoom(roomName) {
    //console.log("testsss")
    const token = this.session.data.access;
    const wsUrl = `wss://${window.location.hostname}/ws/pong-game/${roomName}/?token=${encodeURIComponent(token)}`;
    //console.log('connect to:', wsUrl);
    if (this.socketRef) {
      //console.log('disconnect');
      this.disconnectFromGame(roomName);
    }
    const socket = this.websockets.socketFor(wsUrl);
    // Register WebSocket event handlers
    //socket.on('open', () => this.onOpen(roomName), this);
    socket.on('message', this.onMessage, this);
    socket.on('close', this.onClose, this);
    this.set('socketRef', socket);
  }

  async disconnectFromGame(roomName) {
    const token = this.session.data.access;
    const wsUrl = `wss://${window.location.hostname}/ws/pong-game/${roomName}/?token=${encodeURIComponent(token)}`;
    //console.log('websocket to close:', roomName);
    this.websockets.closeSocketFor(wsUrl);
    //console.log('websocket closed', this.websockets.sockets);

    // Remove event handlers
    this.socketRef.off('open', this.onOpen, this);
    this.socketRef.off('message', this.onMessage, this);
    this.socketRef.off('close', this.onClose, this);

    // Reset WebSocket reference
    this.socketRef = null;
    this.gameData.clearGameData();
  }

  onMessage(event) {
    //console.log('WebSocket message received:', event.data);
    const parsedMessage = JSON.parse(event.data);
    //console.log("t1", this.gameData.roomData);
    if (!this.gameData.roomData)
      this.gameData.reconnect(parsedMessage);
    else if (this.gameData.waiting)
      this.gameData.setPlayer2(parsedMessage.player2);
    this.updateGameState(parsedMessage);
  }

  onClose(event) {
    //console.log('close:', event);
  }

  sendMessage(data) {
    if (this.socketRef) {
      //console.log('WebSocket message send:', JSON.stringify(data));
      this.socketRef.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected.');
    }
  }
}
