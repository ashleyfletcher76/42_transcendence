import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PongGameRoute extends Route {
  @service session;

  async beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.session.requireAuthentication(transition, 'login');
    }
  }
  queryParams = {
    gameType: { refreshModel: true },
    data: { refreshModel: true },
  };

  model(params) {
    return { gameType: params.gameType, data: params.data };
  }
}