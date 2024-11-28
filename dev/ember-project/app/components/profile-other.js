import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileOtherComponent extends Component {
  @service chat;
  @service session;

  @action
  startLiveChat() {
    console.log('Live chat started');
    this.chat.updateInputValue("/" + this.args.selectedUser.nickname + " ")
    this.chat.focusInput();
  }

  @action
  playGame() {
    console.log('Game initiated');
    this.chat.updateInputValue("/*invite " + this.args.selectedUser.nickname);
    this.chat.sendMessage()
  }

  @action
  addFriend() {
    this.chat.updateInputValue("/*add " + this.args.selectedUser.nickname);
    this.chat.sendMessage()
  }

  @action
  async blockUser(type) {
    const apiEndpoint = "http://localhost:8001/users/block/";

    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.session.data.authenticated.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            nickname: this.args.selectedUser.nickname,
            type: type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to block user");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error blocking user:", error.message);
      throw error;
    }
  }

  @action
  onCloseClick() {
    console.log('Close clicked!');
    this.args.selectUser(null);
  }
}
