import Ember from 'ember';
import LogApiErrors from 'ember-error-logger/mixins/log-api-errors';

const {
    RSVP: { reject },
    inject: { service }
} = Ember;

export default Ember.Mixin.create(LogApiErrors, {
    session: service(),

    //handles status-code specific API errors
    //this logic should be executed anywhere we make backend API requests
    //e.g. ember-data adapter, ajax services, ect.
    handleResponse(status) {
        if (status === 401) {
            if (this.get('session.isAuthenticated')) {
                this.get('session').invalidate();
                //reject the promise for the original request so that when transitioning
                //subsequent requests from the route are not attempted
                return reject();
            } else {
                window.location.replace('/login');
                return;
            }
        }

        return this._super(...arguments);
    }
});
