import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class TournamentController extends Controller {
  @service tournament;
  @service user;
}