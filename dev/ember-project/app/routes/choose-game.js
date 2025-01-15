import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChooseGameRoute extends Route {
  @service session;
  @service gameData;
  @service pongGame;
  @service user;
  @service router;

  async beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.session.requireAuthentication(transition, 'login');
    }
    if (this.user.profile.tournament_name)
    {
      this.connectToLobby(tournament_name);
      this.user.profile.tournament_name = null;
    }
    if (this.gameData.roomData || this.user.profile.game_name) {
      if (this.user.profile.game_name && !this.pongGame.socketRef)
      {
        this.gameData.waiting = false;
        await this.pongGame.connectToRoom(this.user.profile.game_name);
        this.user.profile.game_name = null;
      }
      this.router.transitionTo('pong-game');
    }
  }
}
