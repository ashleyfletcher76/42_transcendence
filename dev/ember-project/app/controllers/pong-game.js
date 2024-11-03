import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PongGameController extends Controller {
	@tracked leftPaddlePosition = 0.5; // Normalize between 0 and 1
	@tracked rightPaddlePosition = 0.5; // Normalize between 0 and 1
	@tracked ballPositionX = 0.5; // Ball position
	@tracked ballPositionY = 0.5; // Ball position
	@tracked leftScore = 0;
	@tracked rightScore = 0;
  
	// Track the state of key presses
	upKeyPressed = false;
	downKeyPressed = false;

	constructor() {
		super(...arguments);
		this.setupKeyListeners();
		this.startKeyPolling(); // Start polling when the controller is created
	  }
	
	  setupKeyListeners() {
		// Use the traditional function syntax for event listener methods
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
		window.addEventListener('keyup', this.handleKeyUp.bind(this));
	  }

	  startKeyPolling() {
		this.pollingInterval = setInterval(() => {
		  this.sendKeyPresses();
		}, 50); // Poll every 50ms
	  }
	
	  async sendKeyPresses() {
		const keyPress = this.getKeyPress();
	
		try {
			const keyPress = this.getKeyPress(); // Assuming this gets the current key press state
		  
			// Create the request body
			const requestBody = JSON.stringify({ keyPress });
		  
			// Log the request body to the console
			console.log('Request body sent to API:', requestBody);
		  
			const response = await fetch('/api3/pong/pong/game/', { //fetch('/api/gamestate.json'
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: requestBody // Use the formatted request body here
			});
		  
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
		if (this.upKeyPressed && !this.downKeyPressed) {
		  return 'up';
		} else if (this.downKeyPressed && !this.upKeyPressed) {
		  return 'down';
		} else {
		  return ''; // No keys pressed
		}
	  }

	  handleKeyDown(event) {
		if (event.key === 'ArrowUp') {
		  this.upKeyPressed = true;
		  console.log('Up key pressed');
		} else if (event.key === 'ArrowDown') {
		  this.downKeyPressed = true;
		  console.log('Down key pressed');
		}
	  }
	
	  handleKeyUp(event) {
		if (event.key === 'ArrowUp') {
		  this.upKeyPressed = false;
		  console.log('Up key released');
		} else if (event.key === 'ArrowDown') {
		  this.downKeyPressed = false;
		  console.log('Down key released');
		}
	  }

	  willDestroy() {
		super.willDestroy();
		// Cleanup the event listeners when the controller is destroyed
		window.removeEventListener('keydown', this.handleKeyDown.bind(this));
		window.removeEventListener('keyup', this.handleKeyUp.bind(this));
	  }
	
	  updateGameState(data) {
		// Assuming the response structure matches what you provided
		this.ballPositionX = data.ball_x;
		this.ballPositionY = data.ball_y;
		this.leftPaddlePosition = data.left_paddle_y;
		this.rightPaddlePosition = data.right_paddle_y;
		this.leftScore = data.left_score;
		this.rightScore = data.right_score;
	  }
	
}
