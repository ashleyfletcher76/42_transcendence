import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserListComponent extends Component {
  @tracked users = [];
  @service session;
  intervalId = null; // To store the interval ID for cleanup

  constructor() {
    super(...arguments);
    this.startFetchingUsers();
  }

  /**
   * Start fetching tournaments every 10 seconds
   */
  startFetchingUsers() {
    this.fetchUsers(); // Fetch immediately on load
    this.intervalId = setInterval(() => {
      this.fetchUsers();
    }, 10000); // 10 seconds
  }

	@action
	async fetchUsers() {
		try {
			const response = await fetch('/users/users/profile-list/', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.session.data.authenticated.access}`,
				'Content-Type': 'application/json',
			},
			});

			if (!response.ok) {
			throw new Error('Network response was not ok');
			}

			this.users = await response.json();
		} catch (error) {
			console.error('Failed to fetch users:', error);
		}
	}

	willDestroy() {
		super.willDestroy(...arguments);
		if (this.intervalId) {
		  clearInterval(this.intervalId); // Clear the interval
		}
	  }
}
