import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModalDialog from 'daacs/mixins/modal-dialog';

export default Ember.Controller.extend(EmberValidations, ModalDialog, {
    validations: {
        'model.firstName': {
            presence: true
        },
        'model.lastName': {
            presence: true
        },
        'model.username': {
            email: true
        },
        'model.password': {
            presence: true,
            length: {
                minimum: 6
            },
            confirmation: {
                message: " doesn't match Password"
            }
        },
        'model.role': {
            presence: true
        }
    },

    async createAccount() {
        try {
            let result = await this.get('model').save();
            this.closeModal();
            this.transitionToRoute('login', {queryParams: {accountCreated: true}});
            return result;
        } catch(error) {
            return Ember.RSVP.reject(error);
        }
    },

    closeModal() {
        if(!this.get('model.isDeleted')) {
            this.get('model').rollbackAttributes();
        }

        this._super(...arguments);
    },

    actions: {
        submit() {
            return this.createAccount();
        }
    }
});
