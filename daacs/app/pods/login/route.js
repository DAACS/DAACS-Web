import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import Authentication from 'daacs/mixins/authentication';
import Config from 'daacs/config/environment';
import ScrollReset from 'daacs/mixins/scroll-reset';
import { translationMacro as t } from 'ember-i18n';

export default Ember.Route.extend(UnauthenticatedRouteMixin, Authentication, ScrollReset, {
    titleToken: t('login.label'),
    beforeModel(transition) {
        //don't allow access to the local login page when SAML is enabled
        //instead, just redirect user to the SAML login URL as if this was a protected page
        if(Config['ember-simple-auth'].isSaml && !this.get('session.isAuthenticated')) {
            transition.abort();
            this.redirectToSamlLogin(transition);
        } else {
            return this._super(...arguments);
        }
    },

    resetController(controller, isExiting) {
        if(isExiting) {
            controller.setProperties({
                authError: null,
                accountCreated: null,
                passwordReset: null,
                identification: '',
                password: ''
            });
        }
    }
});
