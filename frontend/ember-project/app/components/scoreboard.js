import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ScoreboardComponent extends Component {
  @service gameData; // Inject the game-data service
}
