import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UserService extends Service {
  @tracked profile = null; // Track the current user profile

  setProfile(userData) {
    this.profile = userData; // Set user data in the service
  }

  clearProfile() {
    this.profile = null; // Clear the user data (on logout)
  }
}
