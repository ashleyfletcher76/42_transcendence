import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GameDataService extends Service {
  @tracked gameType = null;
  @tracked roomData = null;
  @tracked player_1 = null;
  @tracked player_2 = null;

  @service session;

  async setGameData(gameType, roomData) {
    this.gameType = gameType;
    this.roomData = roomData;

    // Fetch user data for player_1 and player_2 asynchronously
    this.player_1 = await this.fetchUserData(roomData.player_1);
    this.player_2 = await this.fetchUserData(roomData.player_2);
  }

  clearGameData() {
    this.gameType = null;
    this.roomData = null;
    this.player_1 = null;
    this.player_2 = null;
  }

  async fetchUserData(nickname) {
    try {
      const response = await fetch('/users/profile-info', {
        method: 'POST', 
        headers: {
          Authorization: `Bearer ${this.session.data.authenticated.access}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }) 
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
}
