import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalProfileComponent extends Component {
  @tracked isModalOpen = false;
  @tracked newNickname;
  @tracked newAvatar = null; // Track the selected avatar file
  @service user;
  @service session;

  @action
  openModal() {
    console.log('Opening modal');
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
  updateAvatar(event) {
    this.newAvatar = event.target.files[0]; // Get the selected file
    console.log('Selected avatar file:', this.newAvatar);
  }

  @action
  async submit() {
    console.log('Form submitted!');
    await this.updateProfile();
    this.closeModal();
  }

  async updateProfile() {
    try {
      const formData = new FormData();
      formData.append('nickname', this.newNickname);

      if (this.newAvatar) {
        formData.append('avatar', this.newAvatar); // Append the avatar file
      }

      const response = await fetch('/users/users/update-profile/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.session.data.authenticated.access}`, // Add authentication token
        },
        body: formData, // Send FormData
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      console.log('Profile updated successfully:', data);

      if (data.success) {
        this.user.fetchUserData(this.newNickname);
      }

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
}
