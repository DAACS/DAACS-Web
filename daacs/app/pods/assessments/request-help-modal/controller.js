import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModalDialog from 'daacs/mixins/modal-dialog';
import Config from 'daacs/config/environment';

const {
    inject: { service },
    RSVP: { reject }
} = Ember;

export default Ember.Controller.extend(EmberValidations, ModalDialog, {
    ajax: service(),
    dialogContent: Config.helpDialogContent,
    formSubmitted: false,
    submitError: null,
    bodyText: null,

    validations: {
        bodyText: {
            presence: true
        }
    },

    async submitForm() {
        this.set('submitError', null);

        try {
            let request = await this.get('ajax').request('help', {
                method: 'POST',
                data: this.get('ajax').stringifyData({
                    assessmentId: this.get('model.assessmentId'),
                    userAgent: navigator.userAgent,
                    text: this.get('bodyText')
                })
            });

            this.setProperties({
                formSubmitted: true,
                bodyText: null
            });

            return request;
        } catch(error) {
            this.set('submitError', error);
            return reject(error);
        }
    },

    resetForm() {
        this.setProperties({
            formSubmitted: false,
            submitError: false,
            bodyText: null
        });
    },

    actions: {
        submit() {
            return this.submitForm();
        }
    }
});
