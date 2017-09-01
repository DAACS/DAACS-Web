import Ember from 'ember';
import EmberValidations from 'ember-validations';

const {
    inject: { service },
    RSVP: { reject }
} = Ember;

export default Ember.Controller.extend(EmberValidations, {
    ajax: service(),

    validations: {
        emailAddress: {
            email: true
        }
    },

    actions: {
        async sendPasswordEmail() {
            try {
                let request = await this.get('ajax').request('forgot-password', {
                    method: 'POST',
                    data: this.get('ajax').stringifyData({
                        username: this.get('emailAddress')
                    })
                });

                this.setProperties({
                    submitSuccess: true,
                    submitError: null,
                    emailAddress: null
                });

                return request;
            } catch(errors) {
                this.set('submitError', errors);
                return reject(errors);
            }
        }
    }
});
