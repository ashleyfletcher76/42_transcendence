import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileOtherComponent extends Component {
  @service chat;
  @service session;
  @service user;

  get isFriend() {
      const friendsList = this.user.profile.friends || [];
      return friendsList.includes(this.user.selectedUser.nickname);
  }

  get isBlocked() {
    const blockedList = this.user.profile.blocked || [];
    return blockedList.includes(this.user.selectedUser.nickname);
  }

  @action
  startLiveChat() {
    console.log('Live chat started');
    this.chat.updateInputValue('/' + this.user.selectedUser.nickname + ' ');
    this.chat.focusInput();
  }

  @action
  playGame() {
    console.log('Game initiated');
    this.chat.updateInputValue('/*invite ' + this.user.selectedUser.nickname);
    this.chat.sendMessage();
  }

  @action
  addFriend(type) {
    if (type === "add")
    {
      this.chat.updateInputValue('/*add ' + this.user.selectedUser.nickname);
      this.chat.sendMessage();
    }
    else
      this.removeFriends();
  }

  async removeFriends() {
    const apiEndpoint = 'users/users/add-friend/';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.session.data.access}`,
        },
        body: JSON.stringify({
          nickname: this.user.selectedUser.nickname,
          type: 'remove',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove friend');
      }
    } catch (error) {
      console.error('Error adding friend:', error.message);
    }
  }

  get isOnline() {
    return this.user.selectedUser?.status === 'online';
  }

  @action
  async blockUser(type) {
    const apiEndpoint = 'users/users/block-user/';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.session.data.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: this.user.selectedUser.nickname,
          type: type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to block user');
      }
      
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error blocking user:', error.message);
      throw error;
    }
  }

  @action
  onCloseClick() {
    console.log('Close clicked!');
    this.user.selectUser(null);
  }
}
