import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MessageComponent extends Component {
  @service session;
  @service gameData;

  @action
  acceptFriend(event) {
    event.preventDefault();
    console.log(`${this.args.message.from} accepted as a friend!`);
    this.makeFriends();
  }

  @action
  joinGame(event) {
    event.preventDefault();
    console.log(`${this.args.message.from} accepted game`);
    this.joinRoom(this.args.message.from);
  }

  async makeFriends() {
    const apiEndpoint = "users/users/add-friend/";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.session.data.authenticated.access}`,
        },
        body: JSON.stringify({  
            nickname: this.args.message.from,
            type: "add",
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add friend");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error adding friend:", error.message);
      throw error;
    }
  }  

  async joinRoom(name) {
    try {
      const response = await fetch('/pong/pong/join-room', {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player: this.args.ownNickname,
          name: name, // Set the selected game type
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.room_name) {
        this.gameData.setGameData("private", data);
        this.router.transitionTo('pong-game');
      }
      else
        console.log("Invitation not valid");
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
