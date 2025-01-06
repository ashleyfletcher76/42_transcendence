import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalProfileComponent extends Component {
  // Property to manage modal visibility
  @tracked isModalOpen = false;
  @tracked newNickname;
  @tracked games = [];

  @service user;
  @service session;

  @action
  openModal() {
    //console.log(this.args.user);
    this.parseHistory(this.args.user.history);
    this.isModalOpen = true;
    //console.log(this.games);
  }

  parseHistory(history) {
    this.games = history.map((game) => ({
      user: this.args.user.nickname,
      opponent: game.opponent,
      result: game.result,
      score: game.score,
      date: game.date,
    }));
  }

  @action
  closeModal() {
    this.isModalOpen = false;
  }

  @action
  cancel() {
    this.closeModal();
  }
}
