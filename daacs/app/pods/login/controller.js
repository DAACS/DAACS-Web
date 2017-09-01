import Ember from 'ember';
import EmberValidations from 'ember-validations';
import Authentication from 'daacs/mixins/authentication';

export default Ember.Controller.extend(EmberValidations, Authentication, {
    accountCreated: false,
    passwordReset: false,

    queryParams: [
        'accountCreated',
        'passwordReset'
    ],

    validations: {
        identification: {
            presence: true
        },
        password: {
            presence: true
        }
    },

    actions: {
        authenticate () {
            return this.authenticateWithOauth(this.get('identification'), this.get('password'));
        }
    }
});
