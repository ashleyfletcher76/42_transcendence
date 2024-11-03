// app/components/user-card.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UserCardComponent extends Component {
  // Define the action method directly
  selectUser() {
    // Handle the action, e.g., trigger some logic for selecting the user
    console.log('User selected!');
  }
}
