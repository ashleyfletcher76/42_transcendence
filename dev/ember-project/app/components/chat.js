import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChatComponent extends Component {
  @tracked showGeneral = true;
  @tracked showWhisper = true;
  @tracked showTournament = true;

  // Computed property to filter messages
  get filteredMessages() {
    return this.args.messages.filter((message) => {
      if (this.showGeneral && message.type === 'all') {
        return true;
      }
      if (this.showWhisper && message.type === 'whisper') {
        return true;
      }
      if (this.showTournament && message.type === 'tournament') {
        return true;
      }
      return false;
    });
  }

  toggleCheckbox = (type) => {
    if (type === 'all') {
      this.showGeneral = !this.showGeneral;
    } else if (type === 'whisper') {
      this.showWhisper = !this.showWhisper;
    } else if (type === 'tournament') {
      this.showTournament = !this.showTournament;
    }
  };

  // This action is passed from the parent to update the message input value
  @action
  updateInputValue(event) {
    this.args.updateInputValue(event); // Call the parent action to update `messageInput`
  }

  // This action is triggered when the Send button is clicked
  @action
  sendMessage() {
    this.args.sendMessage(); // Call the parent action to send the message
  }

  @action
  handleKeyDown(event) {
    if (event.key === 'Enter') {
      // If the Enter key was pressed, trigger the sendMessage function
      this.sendMessage();
    }
  }
}
