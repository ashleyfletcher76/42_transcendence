import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TournamentListComponent extends Component {
  @tracked tournaments = [];

  constructor() {
    super(...arguments);
    this.fetchTournaments();
  }

  @action
  async fetchTournaments() {
    try {
      const response = await fetch('/api/tournaments.json'); // Simulating API call
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.tournaments = await response.json();
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
    }
  }
}
