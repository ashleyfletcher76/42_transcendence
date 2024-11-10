import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TournamentListComponent extends Component {
  @tracked users = [];

  constructor() {
    super(...arguments);
    this.fetchUsers();
  }

  @action
  async fetchUsers() {
    try {
      const response = await fetch('/api/users.json'); // Simulating API call
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.users = await response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }
}
