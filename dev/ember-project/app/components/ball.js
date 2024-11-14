import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class BallComponent extends Component {
  get ballStyle() {
    // Adjust translate based on your game logic
    return htmlSafe(
      `transform: translate(${this.args.positionX}vw, ${this.args.positionY}vh);`,
    ); // Pass X and Y positions
  }
}
