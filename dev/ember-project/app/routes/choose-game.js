import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChooseGameRoute extends Route {
  @service session;
  @service gameData;
  @service user;
  @service router;

  async beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.session.requireAuthentication(transition, 'login');
    }
    console.log("tetsst");
    if (this.gameData.roomData.room_name || this.user.profile.game_name) {
      console.log("tetsst");
      if (this.user.profile.game_name)
      {
        this.pongGame.connectToRoom(this.roomData.room_name);
      }
      this.router.transitionTo('pong-game');
    }
  }
}
