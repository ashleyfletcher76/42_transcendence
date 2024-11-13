import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class ApplicationController extends Controller {
  @tracked selectedUser = null; // Initially no user is selected

  // Action to handle the user selection
  @action
  selectUser(user) {
    console.log('Selected User:', user);
    this.selectedUser = user; // Update the selected user
  }
}
