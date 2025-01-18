import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MessageComponent extends Component {
  @service session;
  @service gameData;
  @service user;
  @service router;
  @service chat;

  @action
  acceptFriend(event) {
    event.preventDefault();
    ////console.log(`${this.args.message.from} accepted as a friend!`);
    this.makeFriends();
  }

  @action
  select(user) {
    this.user.selectUser(user); // Passing the selected user to the parent action
  }

  @action
  acceptGame(event) {
    event.preventDefault();
    //console.log(`${this.args.message.from} accepted game`);
    this.createPrivateRoom('private');
  }

  async createPrivateRoom(gameType) {
    try {
      const response = await fetch('/pong/pong/create-room', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.session.data.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player: this.user.profile.nickname,
          player_2: this.args.message.from,
          gameType: gameType, // Set the selected game type
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.room_name) {
        if (data.player2 != 'remote') this.gameData.waiting = false;
        //console.log('data:', data);
        this.gameData.setGameData(gameType, data);
        //console.log('gameData:', this.gameData.roomData.room_name);
        this.chat.sendGameAccept(data, this.args.message.from);
        this.router.transitionTo('pong-game');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async makeFriends() {
    const apiEndpoint = 'users/users/add-friend/';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.session.data.access}`,
        },
        body: JSON.stringify({
          nickname: this.args.message.from,
          type: 'add',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add friend');
      }

      const result = await response.json();
      //console.log(result.message);
    } catch (error) {
      console.error('Error adding friend:', error.message);
    }
  }
}
