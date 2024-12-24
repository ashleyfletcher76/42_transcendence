## Display User Profile Avatar (Ember.js)

Steps to Display the Avatar
1. Fetch User Profile Data

Use the following API endpoint to fetch the user profile data:
```bash
GET http://localhost:8001/users/profile-info/
```
* Authorization: Add a valid Bearer Token in the request headers:
```http
Authorization: Bearer <Your Access Token>
```
* Example Response:
```json
{
	"username": "newuser",
	"nickname": "ash1",
	"avatar": "/media/avatars/newuser/default_image.png",
	"trophies": "TBD",
	"games_total": "TBD",
	"wins": "TBD",
	"losses": "TBD",
	"blocked": [],
	"friends": [],
	"history": [],
	"status": "online",
	"last_seen": "2024-12-17T16:25:13.168Z"
}
```

----------------------

2. Create a Service to Fetch Profile Data

Use Ember's Service to manage the API request and data retrieval.

Run this command to generate a new service:
```bash
ember generate service profile
```
app/services/profile.js:
```javascript
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ProfileService extends Service {
  @service ajax; // Assuming you use ember-ajax for API calls
  @tracked profile = null;

  @action
  async fetchProfile() {
    try {
      const response = await this.ajax.request('http://localhost:8001/users/profile-info/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer <Your Access Token>`
        }
      });
      this.profile = response;
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }
}
```

---------------------

3. Display the Avatar in a Component

Generate a new component to render the user profile avatar:
```bash
ember generate component user-profile
```
app/components/user-profile.hbs:
```handlebars
<div class="user-profile">
  <h1>{{@profile.username}}'s Profile</h1>
  {{#if @profile.avatar}}
    <img
      src="http://localhost:8001{{@profile.avatar}}"
      alt="User Avatar"
      class="user-avatar"
    />
  {{else}}
    <img
      src="/images/default-avatar.png"
      alt="Default Avatar"
      class="user-avatar"
    />
  {{/if}}
</div>
```
app/components/user-profile.js:
```javascript
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class UserProfileComponent extends Component {
  @service profile;

  constructor() {
    super(...arguments);
    this.profile.fetchProfile();
  }

  get userProfile() {
    return this.profile.profile;
  }
}
```

------------------

4. Style the Avatar

Add some basic styles to make the avatar look clean and circular.

app/styles/app.css:
```css
.user-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Circular avatar */
  object-fit: cover; /* Ensure proper image scaling */
}

.user-profile {
  text-align: center;
  margin: 20px;
}
```

---------------------

5. Render the Component

Place the user-profile component where the avatar needs to be displayed.

Example: app/templates/application.hbs
```handlebars
<UserProfile @profile={{this.profile.profile}} />
```
