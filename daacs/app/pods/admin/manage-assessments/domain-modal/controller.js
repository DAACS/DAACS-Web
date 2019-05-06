import Ember from 'ember';
import ModalDialog from 'daacs/mixins/modal-dialog';
import EmberValidations from 'ember-validations';
import DomainTypes from 'daacs/constants/assessment/domain-types';
import Uploader from 'ember-uploader/uploaders/base';
import Config from 'daacs/config/environment';

const {
    get,
    set,
    setProperties,
    isBlank,
    isEmpty,
    isArray,
    isNone,
    tryInvoke,
    observer,
    computed,
    run: {
        scheduleOnce
    },
    inject: {
        service
    },
    RSVP: {
        reject
    }
} = Ember;

export default Ember.Controller.extend(ModalDialog, EmberValidations, {
    notify: service(),
    domainTypes: DomainTypes,
    isUploading: false,

    validations: {
        'model.label': {presence: true},
        'model.id': {presence: true},
        'model.domainType': {presence: true}
    },

    parentDomains: computed('assessment.domains.[]', 'model', function() {
        return get(this, 'assessment.domains').without(get(this, 'model'));
    }),

    labelDidChange: observer('model.label', function() {
        if(get(this, 'isNew') && !isBlank(get(this, 'model.label'))) {
            scheduleOnce('afterRender', this, 'updateId', get(this, 'model.label'));
        }
    }),

    updateId(label) {
        const newId = label.toLowerCase().trim().replace(/[^\sa-z0-9]/gi, '').replace(/\s+/g, '_');
        set(this, 'model.id', newId);
    },

    setupModal(assessment, parentDomain, isNew) {
        setProperties(this, {
            originalParentDomain: parentDomain,
            newParentDomain: parentDomain,
            assessment,
            isNew
        });
    },

    async uploadModelFile(files) {
        if(!isArray(files) || isEmpty(files[0])) {
            return;
        }

        try {
            const uploader = Uploader.create({
                url: `${Config.RESTAPI}/assessments/upload-lightside-models`,
                ajaxSettings: {
                    headers: {
                        Authorization: `Bearer ${get(this, 'session.data.authenticated.access_token')}`
                    }
                }
            });

            set(this, 'isUploading', true);
            const response = await uploader.upload(files[0], {});
            set(this, 'isUploading', false);
            set(this, 'model.lightsideModelFilename', get(response, 'fileName'));
            get(this, 'notify').success(get(this, 'i18n').t('admin.lightside.uploadSuccess'));
            return response;
        } catch(error) {
            const errCode = get(error, 'responseJSON.errors.firstObject.code') || 'serverError.msg';
            set(this, 'isUploading', false);
            get(this, 'notify').error(get(this, 'i18n').t(errCode));
            return reject(error);
        }
    },

    actions: {
        save() {
            const model = get(this, 'model');
            const origParent = get(this, 'originalParentDomain');
            const newParent = get(this, 'newParentDomain');
            const assessmentDomains = get(this, 'assessment.domains');
            const isSubDomain = !isNone(assessmentDomains.find(d => get(d, 'subDomains').toArray().includes(model)));
            const inAssessment = isSubDomain || assessmentDomains.toArray().includes(model);

            if(newParent !== origParent) {
                //if the domain's parent was changed, remove it from its original parent
                //and add it to its new parent
                tryInvoke(origParent ? get(origParent, 'subDomains') : assessmentDomains, 'removeObject', [model]);
                tryInvoke(newParent ? get(newParent, 'subDomains') : assessmentDomains, 'pushObject', [model]);
            } else if(!inAssessment) {
                //if the domain is not yet in the assessment at all, add it at the top level
                tryInvoke(assessmentDomains, 'pushObject', [model]);
            }

            this.closeModal();
        },

        cancelAdd() {
            get(this, 'store').unloadRecord(get(this, 'model'));
            this.closeModal();
        },

        updateParent(newParentId) {
            const assessmentDomains = get(this, 'assessment.domains');
            const newParent = newParentId && assessmentDomains.findBy('id', newParentId);
            set(this, 'newParentDomain', newParent);
        },

        onFileChange(files) {
            return this.uploadModelFile(files);
        }
    }
});
