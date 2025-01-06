import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalProfileComponent extends Component {
  @tracked isModalOpen = false;
  @tracked newNickname;
  @tracked newAvatar = null; // Track the selected avatar file
  @tracked error;

  @service user;
  @service session;

  @action
  openModal() {
    this.isModalOpen = true;
    this.newNickname = this.user.profile.nickname;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
  }

  @action
  updateNewNickname(event) {
    this.newNickname = event.target.value;
  }

  @action
  updateAvatar(event) {
    this.newAvatar = event.target.files[0]; // Get the selected file
  }

  @action
  async submit() {
    await this.updateProfile();
    if (!this.error)
      this.closeModal();
  }

  async updateProfile() {
      const formData = new FormData();
      formData.append('nickname', this.newNickname);

      if (this.newAvatar) {
        formData.append('avatar', this.newAvatar); // Append the avatar file
      }

      const response = await fetch('/users/users/update-profile/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.session.data.access}`, // Add authentication token
        },
        body: formData, // Send FormData
      });

      const data = await response.json();

      if (data.success) {
        this.user.fetchUserData(this.newNickname);
      }
      else
        this.error = data.message;
  
  }
}
