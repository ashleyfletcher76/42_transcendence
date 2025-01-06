import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @tracked selectedUser = null; // Initially no user is selected
  @service session;
  @service router;
  @service user;

  get activeRoute() {
    return this.router.currentRouteName;
  }

  // Action to handle the user selection
  @action
  selectUser(user) {
    console.log('Selected User:', user);
    if (user && user.nickname !== this.user.profile.nickname)
      this.fetchUserData(user.nickname);
    else this.selectedUser = null;
  }

  async fetchUserData(nickname) {
    try {
      const response = await fetch('/users/users/profile-info/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.session.data.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      this.selectedUser = data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
}
