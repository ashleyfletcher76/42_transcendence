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

  async fetchUserData(username) {
    try {
      // Use proper string interpolation with backticks and `${}`
      const response = await fetch(`/api/${username}.json`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.session.data.authenticated.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile for user: ${username}`);
      }

      const data = await response.json();
      console.log(`Fetched user data for ${username}:`, data);
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null; // Return null or handle the error in a way appropriate for your app
    }
  }
}
