import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModalDialog from 'daacs/mixins/modal-dialog';
import Uploader from 'ember-uploader/uploaders/base';
import Config from 'daacs/config/environment';

const {
    get,
    set,
    inject: { controller, service },
    RSVP: { reject }
} = Ember;

export default Ember.Controller.extend(EmberValidations, ModalDialog, {
    notify: service(),

    classesIndexController: controller('classes/index'),

    validations: {
        file: {
            presence: true
        }
    },

    async importClasses() {
        const file = this.get('file');
        const uploader = Uploader.create({
            url: `${Config.RESTAPI}/classes/upload`,
            method: 'POST',
            ajaxSettings: {
                headers: {
                    Authorization: `Bearer ${get(this, 'session.data.authenticated.access_token')}`
                }
            }
        });

        set(this, 'isUploading', true);
        try {
            const response = await uploader.upload(file, {});
            set(this, 'isUploading', false);
            this.reloadClasses();
            this.closeModal();
            get(this, 'notify').success(get(this, 'i18n').t('classes.import.importSuccess'));
            return response;
        } catch(errors) {
            set(this, 'isUploading', false);
            get(this, 'notify').error(get(this, 'i18n').t('classes.import.importFailed'));
            return reject(errors);
        }
    },

    reloadClasses() {
        get(this, 'classesIndexController').reloadClasses();
    },

    closeModal() {
        this._super(...arguments);
    },

    actions: {
        submit() {
            return this.importClasses();
        },

        fileSelected(files) {
            this.set('file', files[0]);
        }
    }
});
