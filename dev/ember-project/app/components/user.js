import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UserCardComponent extends Component {
  @tracked isActive = false;
  @service user;

  @action
  select() {
    //console.log('User clicked!');
    // Call the parent action passed via @selectUser
    this.user.selectUser(this.args.user.nickname); // Passing the selected user to the parent action
  }

  get isOnline() {
    return this.args.user?.status === 'online';
  }
}
