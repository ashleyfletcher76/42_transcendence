import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @service session;

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
        this.password
      );
    } catch (error) {
      this.error = error;
    }
  }
}
