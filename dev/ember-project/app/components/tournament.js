import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class TournamentComponent extends Component {

  @action
  onJoinClick() {
    console.log('Join clicked!');
  }

  @action
  onLeaveClick() {
    console.log('Leave clicked!');
  }
}
