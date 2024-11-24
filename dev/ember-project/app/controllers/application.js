import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @tracked selectedUser = null; // Initially no user is selected
  @tracked ownUser = null; // Tracks user data for the template
  @service session;

  // Action to handle the user selection
  @action
  selectUser(user) {
    console.log('Selected User:', user);
    this.selectedUser = user; // Update the selected user
  }

  get isAuthenticated() {
    if (this.session.isAuthenticated && !this.ownUser) {
      this.fetchUserData();
    }
  }

  async fetchUserData() {
    try {
      const response = await fetch('/api/profile.json', {
        method: 'GET',
        headers: {
          //Authorization: `Bearer ${this.session.data.authenticated.token}`, // Use token from session
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      console.log(data);
      this.ownUser = data; // Store user data for use in the template
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
}
