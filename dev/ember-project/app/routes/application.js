import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;

  async beforeModel() {
    if (!this.sessionInitialized) {
      await this.session.setup();
    }
  }
}
