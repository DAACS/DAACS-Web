import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Authentication from 'daacs/mixins/authentication';
import Config from 'daacs/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, Authentication, {
    beforeModel(transition) {
        //if SAML is enabled, redirect to the external SAML login URL instead of transitioning to the login page
        if(Config['ember-simple-auth'].isSaml && !this.get('session.isAuthenticated')) {
            transition.abort();
            this.redirectToSamlLogin(transition);
        } else {
            return this._super(...arguments);
        }
    }
});
