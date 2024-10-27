import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service session;

    async beforeModel(transition) {
        if (!this.session.isAuthenticated) {
            this.session.requireAuthentication(transition, 'login');
        }
    }
}
