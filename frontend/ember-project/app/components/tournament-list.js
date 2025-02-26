import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentListComponent extends Component {
  @service session;
  @tracked tournaments = [];
  intervalId = null; // To store the interval ID for cleanup

  constructor() {
    super(...arguments);
    this.startFetchingTournaments();
  }

  /**
   * Start fetching tournaments every 10 seconds
   */
  startFetchingTournaments() {
    this.fetchTournaments(); // Fetch immediately on load
    this.intervalId = setInterval(() => {
      this.fetchTournaments();
    }, 10000); // 10 seconds
  }

  /**
   * Fetch tournaments from the API
   */
  @action
  async fetchTournaments() {
    if (this.session.isAuthenticated)
    {
      try {
        const response = await fetch('/lobby/list/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.session.data.access}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch lobby list');
        }
        const data = await response.json();
        this.tournaments = data.tournaments;
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    }
  }

  /**
   * Cleanup the interval when the component is destroyed
   */
  willDestroy() {
    super.willDestroy(...arguments);
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval
    }
  }
}
