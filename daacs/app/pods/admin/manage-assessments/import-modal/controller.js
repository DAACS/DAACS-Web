
import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModalDialog from 'daacs/mixins/modal-dialog';
import FileReader from 'daacs/mixins/file-reader';

const {
    inject: { service }
} = Ember;

export default Ember.Controller.extend(EmberValidations, ModalDialog, FileReader, {
    ajax: service(),
    notify: service(),
    assessmentJson: null,
    submitError: null,

    validations: {
        assessmentJson: {
            json: true
        }
    },

    reset() {
        this.setProperties({
            assessmentJson: null,
            submitError: null
        });
    },

    async save() {
        try {
            this.set('submitError', null);

            //perform a direct AJAX request to create the assessment since the user
            //is providing a raw JSON document which can include multiple levels of
            //nested models and we want the server to validate it before attempting
            //to add any of them to the local store
            let json = JSON.parse(this.get('assessmentJson'));
            let response = await this.get('ajax').request('assessments', {
                method: 'POST',
                data: this.get('ajax').stringifyData(json)
            });

            this.closeModal();
            this.transitionToRoute('admin.manage-assessments.assessment', response.data.id);
        } catch(errors) {
            let submitError = errors || {errors: [{code: 'serverError.msg'}]};
            this.set('submitError', submitError);
            Ember.RSVP.reject(submitError);
        }
    },

    async readJsonFromFile(file) {
        try {
            let contents = await this.readFile(file);
            this.set('assessmentJson', contents);
            return contents;
        } catch(error) {
            this.get('notify').error(this.get('i18n').t('admin.import.readFileError'));
            return Ember.RSVP.reject(error);
        }
    },

    actions: {
        cancel() {
            this.reset();
            this._super(...arguments);
        },

        save() {
            return this.save();
        },

        shouldConfirmSave() {
            try {
                let json = JSON.parse(this.get('assessmentJson'));
                return (json.enabled === true);
            } catch(error) {
                //invalid json, dont do anything...
            }
        },

        fileSelected(files) {
            this.readJsonFromFile(files[0]);
        }
    }
});
