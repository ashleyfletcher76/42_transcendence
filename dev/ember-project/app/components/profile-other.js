import Component from '@glimmer/component';

export default class ProfileOtherComponent extends Component {
  get user() {
    return this.userTracker.selectedUser; // Access the selected user
  }
}
