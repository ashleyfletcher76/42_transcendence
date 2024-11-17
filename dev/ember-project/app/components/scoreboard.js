import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ScoreboardComponent extends Component {
  @service gameData; // Inject the game-data service

  get gameType() {
    return this.gameData.gameType; // Access shared game type
  }

  get roomData() {
    return this.gameData.roomData; // Access shared room data
  }

  get player_1() {
    return this.gameData.player_1; // Access shared room data
  }

  get player_2() {
    return this.gameData.player_2; // Access shared room data
  }

}