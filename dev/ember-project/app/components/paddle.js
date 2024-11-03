import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class PaddleComponent extends Component {
  
	constructor() {
		super(...arguments);
		console.log('Paddle side:', this.args.side);
		console.log('Paddle position:', this.args.position);
	  }
	  
	get paddleStyle() {
    // You can adjust the translateY based on your logic
    return htmlSafe(`transform: translateY(${this.args.position}px);`); // Pass position from args
  }
}
