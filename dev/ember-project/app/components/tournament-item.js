import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentItemComponent extends Component {
  @service tournament;
  @service user;

  @action
  onJoinClick(creator) {
    console.log('Join clicked!');
    this.tournament.connectToLobby(creator, this.user.profile.nickname);
  }

  @action
  onLeaveClick() {
    console.log('Leave clicked!');
    this.tournament.disconnectFromLobby(this.user.profile.nickname);
  }
}
