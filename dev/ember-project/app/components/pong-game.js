import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PongGameComponent extends Component {
  @service pongGame;
  @service gameData;
  @service router;

  leaveGame = () => {
    if (this.gameData.roomData)
      this.pongGame.disconnectFromGame(this.gameData.roomData.room_name);
    this.router.transitionTo('choose-game');
  };

}
