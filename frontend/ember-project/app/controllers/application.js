import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;
  @service user;
  @service session;

  get activeRoute() {
    return this.router.currentRouteName;
  }
}
