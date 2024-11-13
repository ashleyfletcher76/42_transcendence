import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ProfileOtherComponent extends Component {

  @action
  onCloseClick() {
    console.log('Close clicked!');
    this.args.user.selectUser(null);
  }
}
