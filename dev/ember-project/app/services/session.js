import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
    @tracked isAuthenticated;
    @tracked data;
    @tracked Initialized;
    @service router;

    requireAuthentication(type, route)
    {
        if (type === 'transition')
            this.router.transitionTo(route);
    }

    async authenticate(username, password) {
        //let response = await fetch('/api/token.json', {
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
        
            // Now you can safely access this.data
            console.log("access:", this.data.access);
            this.isAuthenticated = true;
        } else {
          let error = await response.text();
          throw new Error(error);
        }
      }

      invalidate()
      {
        this.isAuthenticated = false;
        this.data = null;
        this.Initialized = false;
        this.router.transitionTo('login');
      }

      prohibitAuthentication(route)
      {
        if (this.isAuthenticated)
            this.router.transitionTo(route);
      }

      setup()
      {
        this.Initialized = true;
        this.router.transitionTo('login');
      }
}
