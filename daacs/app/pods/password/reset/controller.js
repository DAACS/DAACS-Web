import Ember from 'ember';
import EmberValidations from 'ember-validations';

const {
    inject: { service },
    RSVP: { reject }
} = Ember;

export default Ember.Controller.extend(EmberValidations, {
    ajax: service(),

    queryParams: [
        'code',
        'id'
    ],

    validations: {
        password: {
            presence: true,
            length: {
                minimum: 6
            },
            confirmation: {
                message: " doesn't match Password"
            }
        }
    },

    actions: {
        async resetPassword() {
            try {
                let request = await this.get('ajax').request('forgot-password', {
                    method: 'PUT',
                    data: this.get('ajax').stringifyData({
                        code: this.get('code'),
                        userId: this.get('id'),
                        password: this.get('password'),
                        passwordConfirm: this.get('passwordConfirmation')
                    })
                });

                this.transitionToRoute('login', {queryParams: {passwordReset: true}});

                return request;
            } catch(errors) {
                this.set('submitError', errors);
                return reject(errors);
            }
        }
    }
});
