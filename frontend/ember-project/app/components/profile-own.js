import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NavigationComponent extends Component {
  @service session;
  @service user; // Inject the UserService to access user data
  @tracked hostname = window.location.hostname;

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }

  get isOnline() {
    if (this.session.isAuthenticated && this.user.profile) {
      return this.user.profile.status === 'online'; // Access `user` directly from the service
    }
    return false;
  }

  @action
  logout() {
    this.session.invalidate();
    this.user.clearProfile(); // Clear user data from the service on logout
  }
}
