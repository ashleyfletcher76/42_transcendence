import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PongGameComponent extends Component {
  @tracked leftPaddlePosition = 0.5; // Normalize between 0 and 1
  @tracked rightPaddlePosition = 0.5; // Normalize between 0 and 1
  @tracked ballPositionX = 0.5; // Ball position
  @tracked ballPositionY = 0.5; // Ball position
  @tracked leftScore = 0;
  @tracked rightScore = 0;
  @tracked winner;
  @service gameData;
  @service session;

  // Track the state of key presses
  p1UpKeyPressed = false;
  p1DownKeyPressed = false;
  p2UpKeyPressed = false;
  p2DownKeyPressed = false;

  constructor() {
    super(...arguments);
    this.setupKeyListeners();
    this.startKeyPolling(); // Start polling when the controller is created
  }

  get roomData() {
    return this.gameData.roomData; // Access shared room data
  }

  get username() {
    return this.gameData.username; // Access shared room data
  }

  setupKeyListeners() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  startKeyPolling() {
    this.pollingInterval = setInterval(() => {
      this.sendKeyPresses();
    }, 50); // Poll every 50ms
  }

  async sendKeyPresses() {
    const { keyPressP1, keyPressP2 } = this.getKeyPress();

    try {
      const requestBody = JSON.stringify({
        keypress_p1: keyPressP1,
        keypress_p2: keyPressP2,
        room_name: this.roomData.room_name,
        user: this.username,
      });

      console.log('Request body sent to API:', requestBody);

      //const response = await fetch(`/api/gamestate.json`, {
      const response = await fetch(
        `/pong/pong/game_state/${this.roomData.room_name}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json',
          },
          body: requestBody,
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.updateGameState(data);
    } catch (error) {
      console.error('Error sending key press:', error);
    }
  }

  getKeyPress() {
    let keyPressP1 = '';
    let keyPressP2 = '';

    if (this.p1UpKeyPressed && !this.p1DownKeyPressed) {
      keyPressP1 = 'up';
    } else if (this.p1DownKeyPressed && !this.p1UpKeyPressed) {
      keyPressP1 = 'down';
    }

    if (this.p2UpKeyPressed && !this.p2DownKeyPressed) {
      keyPressP2 = 'up';
    } else if (this.p2DownKeyPressed && !this.p2UpKeyPressed) {
      keyPressP2 = 'down';
    }

    return { keyPressP1, keyPressP2 };
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.p1UpKeyPressed = true;
        console.log('Player 1 Up key pressed');
        break;
      case 'ArrowDown':
        this.p1DownKeyPressed = true;
        console.log('Player 1 Down key pressed');
        break;
      case 'w':
      case 'W':
        this.p2UpKeyPressed = true;
        console.log('Player 2 Up key pressed');
        break;
      case 's':
      case 'S':
        this.p2DownKeyPressed = true;
        console.log('Player 2 Down key pressed');
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.p1UpKeyPressed = false;
        console.log('Player 1 Up key released');
        break;
      case 'ArrowDown':
        this.p1DownKeyPressed = false;
        console.log('Player 1 Down key released');
        break;
      case 'w':
      case 'W':
        this.p2UpKeyPressed = false;
        console.log('Player 2 Up key released');
        break;
      case 's':
      case 'S':
        this.p2DownKeyPressed = false;
        console.log('Player 2 Down key released');
        break;
    }
  }

  updateGameState(data) {
    this.ballPositionX =
      data.ball_x * (25 - visualViewport.height / visualViewport.width);
    this.ballPositionY = data.ball_y * 24;
    this.leftPaddlePosition = data.left_paddle_y * 10;
    this.rightPaddlePosition = data.right_paddle_y * 10;
    this.leftScore = data.left_score;
    this.rightScore = data.right_score;
    this.winner = data.winner;
    if (this.winner) this.willDestroy();
  }

  willDestroy() {
    super.willDestroy();
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    clearInterval(this.pollingInterval);
  }
}
