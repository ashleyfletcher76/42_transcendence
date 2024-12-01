import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @tracked selectedUser = null; // Initially no user is selected
  @tracked ownUser = null; // Tracks user data for the template
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
    this.fetchUserData(user.nickname);
  }

  async fetchUserData(nickname) {
    try {
      const response = await fetch('/users/users/profile-info/', {
        method: 'POST', 
        headers: {
          Authorization: `Bearer ${this.session.data.authenticated.access}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }) 
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
