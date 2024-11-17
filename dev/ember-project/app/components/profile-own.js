import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NavigationComponent extends Component {
  @service session;
  @tracked ownUser = null; // Tracks user data for the template

  get isAuthenticated() {
    if (this.session.isAuthenticated && !this.userData) {
      this.fetchUserData();
    }
    return this.session.isAuthenticated;
  }

  @action
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

  @action
  logout() {
    this.session.invalidate();
  }
}