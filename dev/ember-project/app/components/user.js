import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserCardComponent extends Component {
  @tracked isActive = false;

  @action
  select() {
    console.log('User clicked!');
    // Call the parent action passed via @selectUser
    this.args.selectUser(this.args.user); // Passing the selected user to the parent action
  }

  get isOnline() {
    return this.args.user?.status === 'online';
  }
}
