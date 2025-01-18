import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class PaddleComponent extends Component {
  constructor() {
    super(...arguments);
  }

  get paddleStyle() {
    return htmlSafe(`transform: translateY(${this.args.position}vh);`); // Pass position from args
  }
}
