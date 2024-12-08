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
  cancel() {
    console.log('Modal canceled');
    this.closeModal(); // Close the modal without submitting
  }
}
