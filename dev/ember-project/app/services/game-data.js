import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GameDataService extends Service {
  @tracked gameType = null;
  @tracked roomData = null;
  @tracked player_1 = null;
  @tracked player_2 = null;
  @tracked left_score = 0;
  @tracked right_score = 0;

  @service session;

  async setGameData(gameType, roomData) {
    this.gameType = gameType;
    this.roomData = roomData;

    // Fetch user data for player_1 and player_2 asynchronously
    if(roomData.player1 !== "AI")
      this.player_1 = await this.fetchUserData(roomData.player1);
    else
      this.player_1 = {
				nickname: "Computer",
				avatar: "/images/default-profile.jpeg",
				trophies: 999,
        status: "online"
			  }
    if(roomData.player2 !== "AI")
      this.player_2 = await this.fetchUserData(roomData.player2);
    else 
      this.player_2 = {
				nickname: "Computer",
				avatar: "/images/default-profile.jpeg",
				trophies: 999,
        status: "online"
			  }
  }

  clearGameData() {
    this.gameType = null;
    this.roomData = null;
    this.player_1 = null;
    this.player_2 = null;
  }

  async fetchUserData(nickname) {
    try {
      const response = await fetch('/users/users/profile-info/', {
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
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
}
