import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UserService extends Service {
  @tracked profile = null; // Track the current user profile
  @service session;
  @service gameData;
  @tracked selectedUser = null; // Initially no user is selected

  constructor() {
    super(...arguments);
    this.startFetchingProfile();
  }

  /**
   * Start fetching tournaments every 10 seconds
   */
  startFetchingProfile() {
    this.intervalId = setInterval(() => {
      this.fetchUserData(this.profile.nickname, "ownProfile");
    }, 10000); // 10 seconds
  }

  selectUser(nickname) {
    if (nickname && nickname !== this.profile.nickname)
      this.fetchUserData(nickname, "otherProfile");
    else if (!nickname)
      this.selectedUser = null;
  }

  setProfile(userData) {
    this.profile = userData; // Set user data in the service
  }

  clearProfile() {
    this.profile = null; // Clear the user data (on logout)
  }

  async fetchUserData(nickname, profile) {
    if (this.session.isAuthenticated)
    {
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
        if (profile === "ownProfile")
          this.setProfile(data); // Store user data for use in the template
        else
          this.selectedUser = data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }
}
