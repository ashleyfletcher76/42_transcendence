// app/components/header-menu.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HeaderMenuComponent extends Component {
  @service router; // Inject the router service

  @action
  navigateTo(route) {
    // Use the Ember router to transition to the selected route
    this.router.transitionTo(route);
  }
}
