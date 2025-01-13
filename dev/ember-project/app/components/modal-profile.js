import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalProfileComponent extends Component {
  @tracked isModalOpen = false;
  @tracked newNickname;
  @tracked newEmail;
  @tracked twofa_enabled;
  @tracked newAvatar = null; // Track the selected avatar file
  @tracked error;

  @service user;
  @service session;

  @action
  openModal() {
    this.isModalOpen = true;
    this.newNickname = this.user.profile.nickname;
    this.newEmail = this.user.profile.two_fa_email;
    this.twofa_enabled = this.user.profile.two_fa_enabled;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
  }

  @action
  toggle2fa() {
    this.twofa_enabled = !this.twofa_enabled;
  }

  @action
  updateNewNickname(event) {
    this.newNickname = event.target.value;
  }

  @action
  updateNewEmail(event) {
    this.newEmail = event.target.value;
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
      formData.append('email', this.newEmail);
      formData.append('twofa_enabled', this.twofa_enabled);

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
