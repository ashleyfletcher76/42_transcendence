import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalProfileComponent extends Component {
  // Property to manage modal visibility
  @tracked isModalOpen = false;
  @tracked newNickname;
  @service user;
  @service session;

  @action
  openModal() {
    console.log('openModal0');
    this.isModalOpen = true;
    this.newNickname = this.user.profile.nickname;
    console.log(this.isModalOpen);
  }

  @action
  closeModal() {
    console.log('Closing modal');
    this.isModalOpen = false;
  }

  @action
  updateNewNickname(event) {
    this.newNickname = event.target.value;
  }

  @action
  submit() {
    console.log('Form submitted!');
    this.changeNickname(this.newNickname);
    this.closeModal();
  }

  @action
  cancel() {
    console.log('Modal canceled');
    this.closeModal(); // Close the modal without submitting
  }

  async changeNickname(newNickname) {
    try {
      const response = await fetch('/api/user/nickname', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.session.data.authenticated.access}`,
        },
        body: JSON.stringify({
          nickname: newNickname,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.nickname) {
        this.user.profile.nickname = nickname;
      }
    } catch (error) {
      console.error('Error changing nickname:', error);
    }
  }
}
