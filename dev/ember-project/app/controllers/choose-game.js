import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChooseGameController extends Controller {
  @service router;
  @service gameData; // Inject the game-data service
  @service user;
  @service session;

  @action
  chooseGame(gameType) {
    this.gameData.waiting = true;
    this.createRoom(gameType);
  }

  async createRoom(gameType) {
    try {
      //const response = await fetch('/api/create-room.json', {
      const response = await fetch('/pong/pong/create-room', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.session.data.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player: this.user.profile.nickname, // Add player_1 with the user's value
          gameType: gameType, // Set the selected game type
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.room_name) {
        if (data.player2 != 'remote') 
          this.gameData.waiting = false;
        console.log('data:', data);
        this.gameData.setGameData(gameType, data);
        console.log('gameData:', this.gameData.roomData.room_name);
        this.router.transitionTo('pong-game');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
