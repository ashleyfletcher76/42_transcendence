import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChooseGameRoute extends Route {
  @service session;
  @service gameData;
  @service router;

  async beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.session.requireAuthentication(transition, 'login');
    }
    if (this.gameData.roomData) {
      this.router.transitionTo('pong-game');
    }
  }
}
