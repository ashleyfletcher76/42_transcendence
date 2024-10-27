import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  @service session;

  // Flag to track if the session has been set up
  sessionInitialized = false;

  async beforeModel() {
    if (!this.sessionInitialized) {
      // Run the session setup only once
      await this.session.setup();
      this.sessionInitialized = true;
    }
  }
}
