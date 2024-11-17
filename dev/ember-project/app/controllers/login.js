import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @service session;
  @service router;

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
      this.router.transitionTo('choose-game'); // Redirect here after successful authentication
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
      this.router.transitionTo('choose-game', {
        queryParams: { username: this.username } // Add the username as a query parameter
      });
    } catch (error) {
      this.error = error.message || 'An error occurred during registration';
    }
  }
}
