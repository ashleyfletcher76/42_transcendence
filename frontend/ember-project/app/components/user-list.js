import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserListComponent extends Component {
  @tracked users = [];
  @tracked filter = 'all';
  @service session;
  @service user;

  intervalId = null; // To store the interval ID for cleanup

  constructor() {
    super(...arguments);
    this.startFetchingUsers();
    this.disableArrowScrolling();
  }

  disableArrowScrolling() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  @action
  handleKeyDown(event) {
    // Arrow keys: ArrowUp, ArrowDown, ArrowLeft, ArrowRight
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); // Prevent scrolling
    }
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

  get filteredUsers() {
    if (this.filter === 'friends') {
      // Check if the user exists in the friends list
      const friendsList = this.user.profile.friends || [];
      return this.users.filter((user) => friendsList.includes(user.nickname));
    }
    // Return all users if filter is 'all'
    return this.users;
  }

  setFilter = (type) => {
    this.filter = type;
    //console.log('filter:', type);
  };

  @action
  async fetchUsers() {
    if (this.session.isAuthenticated)
    {
      try {
        const response = await fetch('/users/users/profile-list/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.session.data.access}`,
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
    }
  
  willDestroy() {
    super.willDestroy(...arguments);
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval
    }
  }
}
