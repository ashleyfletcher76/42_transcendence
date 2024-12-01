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

  @action
  update(attr, event) {
    this[attr] = event.target.value;
  }

  @action
  async login(event) {
    event.preventDefault();

    try {
      await this.session.authenticate(
        'authenticator:token',
        this.username,
        this.password,
      );
      this.fetchUserData("");
      console.log(this.session.data);
      console.log(this.session.data.authenticated.access);
      this.router.transitionTo('choose-game');
    } catch (error) {
      this.error = error;
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
        throw new Error('Registration failed');
      }

      // Optionally, log in the user directly after registration
      await this.session.authenticate(
        'authenticator:token',
        this.username,
        this.password,
      );
      this.fetchUserData("");
      this.router.transitionTo('choose-game');
    } catch (error) {
      this.error = error.message || 'An error occurred during registration';
    }
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
      console.log(data);
      this.user.setProfile(data); // Store user data for use in the template
      console.log(this.user.profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
}
