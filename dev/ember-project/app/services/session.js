import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @tracked isAuthenticated;
  @tracked data;
  @tracked Initialized;
  @service router;
  @service chat;
  @tracked twofa = false;

  requireAuthentication(type, route) {
    if (type === 'transition')
      this.router.transitionTo(route);
  }

  async authenticate(username, password) {
    let response = await fetch('/auth/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      // Await the response.json() to get the actual data
      this.data = await response.json();
      if (this.data.two_fa_required) {
        this.twofa = true;
      }
      else
        this.isAuthenticated = true;
    } else {
      let error = await response.text();
      throw new Error(error);
    }
  }

  async send_twofa(username, code) {
    //let response = await fetch('/api/token.json', {
    let response = await fetch('/auth/auth/validate-2fa/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        code,
      }),
    });
    if (response.ok) {
      // Await the response.json() to get the actual data
      this.data = await response.json();
      this.isAuthenticated = true;
    } else {
      let error = await response.text();
      throw new Error(error);
    }
  }

  async invalidate() {
    await this.logout();
    window.location.reload();
  }

  async logout() {
    await fetch('/auth/auth/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.data.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: this.data.refresh,
      }),
    });
  }

  prohibitAuthentication(route) {
    if (this.isAuthenticated)
      this.router.transitionTo(route);
  }

  setup() {
    this.Initialized = true;
    this.router.transitionTo('login');
  }
}
