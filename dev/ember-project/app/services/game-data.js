import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GameDataService extends Service {
  @tracked gameType = null;
  @tracked roomData = null;

  setGameData(gameType, roomData) {
    this.gameType = gameType;
    this.roomData = roomData;
  }

  clearGameData() {
    this.gameType = null;
    this.roomData = null;
  }
}
