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
  @tracked waiting = true;

  @service session;
  @service pongGame;

  async reconnect(data) {
    const roomData = {
      player1: data?.player1 || null,
      player2: data?.player2 || null,
      room_name: data?.room_name || null,
    };
    this.setGameData("reconnect", roomData);
  }

  async setGameData(gameType, roomData) {
    this.gameType = gameType;
    this.roomData = roomData;

    this.pongGame.winner = null;
    if (roomData.player1 !== 'AI' && roomData.player1 !== 'local')
      this.player_1 = await this.fetchUserData(roomData.player1);
    else if (roomData.player1 !== 'local')
      this.player_1 = {
        nickname: 'Computer',
        avatar: '/media/default_photo/default_photo.png',
        trophies: 999,
        status: 'online',
      };
    else
      this.player_1 = {
        nickname: 'Player_2',
        avatar: '/media/default_photo/default_photo.png',
        trophies: 0,
        status: 'online',
      };
    if (roomData.player2 !== 'AI' && roomData.player2 !== 'local')
      this.player_2 = await this.fetchUserData(roomData.player2);
    else if (roomData.player2 !== 'local')
      this.player_2 = {
        nickname: 'Computer',
        avatar: '/media/default_photo/default_photo.png',
        trophies: 999,
        status: 'online',
      };
    else
      this.player_2 = {
        nickname: 'Player_2',
        avatar: '/media/default_photo/default_photo.png',
        trophies: 0,
        status: 'online',
      };
    if (this.gameType !== "reconnect")
      this.pongGame.connectToRoom(this.roomData.room_name);
  }

  clearGameData() {
    this.gameType = null;
    this.roomData = null;
    this.player_1 = null;
    this.player_2 = null;
  }

  async setPlayer2(nickname) {
    //console.log('setPlayer2', nickname);
    this.player_2 = await this.fetchUserData(nickname);
    this.waiting = false;
  }

  async fetchUserData(nickname) {
    try {
      const response = await fetch('/users/users/profile-info/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.session.data.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
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
