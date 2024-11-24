import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ChooseGameController extends Controller {
  @service router;
  @tracked loading = false; // Tracks the loading state
  @service gameData; // Inject the game-data service

  queryParams = ['username'];

  @action
  chooseGame(gameType) {
    this.loading = true;
    this.createRoom(gameType);
  }

  async createRoom(gameType) {
    try {
      //const response = await fetch('/api/create-room.json', {
      const response = await fetch('/pong/pong/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player: this.username, // Add player_1 with the user's value
          gameType: gameType, // Set the selected game type
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.room_name) {
        this.loading = false;
        this.gameData.setGameData(gameType, data, this.username);

        this.router.transitionTo('pong-game', {
          queryParams: {
            gameType: gameType,
            roomData: data, // pass data as a query parameter
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
