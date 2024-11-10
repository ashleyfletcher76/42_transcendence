import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserCardComponent extends Component {
  @tracked isActive = false;

  // Action to prevent propagation for buttons
  @action
  stopEventPropagation(event) {
    event.stopPropagation();
  }

  // Action to handle card click and apply active state conditionally
  @action
  handleCardClick(event) {
    // Check if the click target is the user-card itself and not a child element
    if (
      event.target.closest('.chat-button') ||
      event.target.closest('.game-button')
    ) {
      return; // Prevent triggering the active state if a button is clicked
    }

    this.isActive = true;

    // Remove the active state after a short delay to simulate a press effect
    setTimeout(() => {
      this.isActive = false;
    }, 200); // Adjust the delay as needed for the active style effect
  }

  @action
  onChatClick() {
    console.log('Chat clicked!');
  }

  @action
  onGameClick() {
    console.log('Game clicked!');
  }

  @action
  selectUser() {
    console.log('User card clicked!');
  }
}
