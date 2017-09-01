import Ember from 'ember';
import EmberValidations from 'ember-validations';
import Uploader from 'daacs/pods/components/file-upload/uploader';
import FileDownload from 'daacs/mixins/file-download';
import Config from 'daacs/config/environment';
import removeKeysFromObject from 'daacs/utils/remove-obj-keys';

const omittedModelProps = [
    'id',
    'createdDate',
    'itemGroups.id',
    'itemGroups.assessmentId',
    'itemGroups.items.id',
    'itemGroups.items.chosenItemAnswerId',
    'itemGroups.items.chosenItemAnswer',
    'itemGroups.items.completeDate',
    'itemGroups.items.startDate',
    'itemGroups.items.possibleItemAnswers.id',
    'writingPrompt.id',
    'writingPrompt.assessmentId',
    'writingPrompt.completeDate',
    'writingPrompt.sample',
    'writingPrompt.startDate'
];

export default Ember.Controller.extend(EmberValidations, FileDownload, {
    notify: Ember.inject.service(),
    editModalCtrlr: Ember.inject.controller('admin/manage-assessments/edit-modal'),
    modelFiles: {},
    validations: {},
    sidebarAffixedMedias: ['jumbo'],

    serializedModel: Ember.computed(function() {
        const serializer = this.store.serializerFor('assessment');
        return serializer.serialize(this.get('model')._createSnapshot(), {includeId: true});
    }).volatile(),

    formattedJSON: Ember.computed(function() {
        let model = this.get('serializedModel'),
            clonedModel = Ember.$.extend(true, {}, model),
            cleanedModel = removeKeysFromObject(clonedModel, [], true);

        return JSON.stringify(cleanedModel, null, 2);
    }).volatile(),

    cleanedJSON: Ember.computed(function() {
        let model = this.get('serializedModel'),
            clonedModel = Ember.$.extend(true, {}, model),
            cleanedModel = removeKeysFromObject(clonedModel, omittedModelProps, true);

        return JSON.stringify(cleanedModel, null, 2);
    }).volatile(),

    async updateConfig() {
        try {
            this.set('serverErrors', null);

            let uploader = Uploader.create({
                url: `${Config.RESTAPI}/assessments/${this.get('model.id')}/upload-lightside-models`,
                namedFileParams: true,
                ajaxSettings: {
                    headers: {
                        Authorization: `Bearer ${this.get('session.data.authenticated.access_token')}`
                    }
                }
            }),
                files = this.get('selectedScoringType') === 'MANUAL' ? {} : this.get('modelFiles'),
                response = await uploader.upload(files, {scoringType: this.get('selectedScoringType')}),
                model = await this.store.findRecord('assessment', this.get('model.id'), {reload: true});

            this.set('model', model);
            this.get('notify').success(this.get('i18n').t('admin.assessmentDetails.configUpdated'));
            return response;
        } catch(error) {
            this.set('serverErrors', error.responseJSON || {errors: [{code: 'serverError.msg'}]});
            return Ember.RSVP.reject(error);
        }
    },

    addModelFile(paramName, files) {
        if(!Ember.isArray(files) || Ember.isEmpty(files[0])) {
            delete this.get('modelFiles')[paramName];
            return;
        }

        this.get('modelFiles')[paramName] = files[0];
    },

    exportAssessment() {
        return this.downloadFile('download/assessments', {
            id: this.get('model.id')
        });
    },

    actions: {
        onFileChange(paramName, files) {
            this.addModelFile(paramName, files);
        },

        updateConfig() {
            return this.updateConfig();
        },

        copySuccess() {
            this.get('notify').success(this.get('i18n').t('admin.assessmentDetails.copySuccess'));
        },

        copyError() {
            this.get('notify').error(this.get('i18n').t('admin.assessmentDetails.copyError'));
        },

        openEdit() {
            this.send(
                'openModal',
                'admin/manage-assessments/edit-modal',
                this.get('model'),
                'admin/manage-assessments/edit-modal'
            );
        },

        exportAssessment() {
            return this.exportAssessment();
        }
    }
});
