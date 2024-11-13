import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TournamentRoute extends Route {
  @service session;

  async beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.session.requireAuthentication(transition, 'login');
    }
  }

  async model() {
    try {
      const response = await fetch('/api/tournaments.json'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch tournament data');
      }
      return await response.json(); // Return the data as the model for this route
    } catch (error) {
      console.error('Error fetching tournament data:', error);
      return null; // Return null or an empty object if there's an error
    }
  }
}
