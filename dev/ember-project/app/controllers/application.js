import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @tracked selectedUser = null; // Initially no user is selected
  @tracked ownUser = null; // Tracks user data for the template
  @service session;
  @service router;
  @service user;
  @service tournament;
  
  get activeRoute() {
    return this.router.currentRouteName;
  }

  // Action to handle the user selection
  @action
  selectUser(user) {
    console.log('Selected User:', user);
    this.selectedUser = user; // Update the selected user
  }
}
