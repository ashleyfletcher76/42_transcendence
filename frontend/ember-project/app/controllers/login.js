import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @service session;
  @service router;
  @service user;

  @tracked username;
  @tracked password;
  @tracked error;
  @tracked twofaCode; // Renamed to avoid conflict with the action

  @action
  update(attr, event) {
    this[attr] = event.target.value;
  }

  @action
  async submitTwofa(event) { // Renamed from `twofa` to `submitTwofa`
    event.preventDefault();

    try {
      await this.session.send_twofa(
        this.username,
        this.twofaCode, // Updated to match the renamed tracked property
      );
      if (this.session.isAuthenticated) {
        await this.fetchUserData('');
        this.router.transitionTo('choose-game');
      }
    } catch (error) {
		this.error = JSON.parse(error.message);
    }
  }

  @action
  async login(event) {
    event.preventDefault();
    try {
      await this.session.authenticate(
        this.username,
        this.password,
      );
      if (this.session.isAuthenticated) {
        await this.fetchUserData('');
        this.router.transitionTo('choose-game');
      }
    } catch (error) {
      this.error = JSON.parse(error.message);
    }
  }

  @action
  async register() {
    try {
      const response = await fetch('/register/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });

      if (!response.ok) {
		throw {
		  error: 'Registration failed',
		};
	  }	  

      // Optionally, log in the user directly after registration
      await this.session.authenticate(
        this.username,
        this.password,
      );
      if (this.session.isAuthenticated) {
        await this.fetchUserData('');
        this.router.transitionTo('choose-game');
      }
    } catch (error) {
		this.error = error || 'An error occurred during registration';
    }
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
      //console.log(data);
      this.user.setProfile(data); // Store user data for use in the template
      //console.log(this.user.profile);
    } catch (error) {
      //console.error('Error fetching user profile:', error);
    }
  }
}
