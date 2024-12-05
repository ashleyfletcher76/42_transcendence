import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentItemComponent extends Component {
  @service tournament;
  @service user;

  @action
  onJoinClick(creator) {
    console.log('Join clicked!', creator);
    this.tournament.connectToLobby(creator);
  }

  @action
  onLeaveClick(creator) {
    console.log('Leave clicked!', creator);
    this.tournament.disconnectFromLobby(creator);
  }
}
