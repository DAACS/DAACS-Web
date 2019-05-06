import Ember from 'ember';
import FileDownload from 'daacs/mixins/file-download';
import EditAssessment from 'daacs/mixins/edit-assessment';
import removeKeysFromObject from 'daacs/utils/remove-obj-keys';

const {
    get,
    set,
    computed,
    $,
    inject: {
        service
    },
    RSVP: {
        reject
    }
} = Ember;

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

export default Ember.Controller.extend(FileDownload, EditAssessment, {
    notify: service(),

    serializedModel: computed(function() {
        const serializer = this.store.serializerFor('assessment');
        return serializer.serialize(this.get('model')._createSnapshot(), {includeId: true});
    }).volatile(),

    formattedJSON: computed(function() {
        const model = this.get('serializedModel');
        const clonedModel = $.extend(true, {}, model);
        const cleanedModel = removeKeysFromObject(clonedModel, [], true);
        return JSON.stringify(cleanedModel, null, 2);
    }).volatile(),

    cleanedJSON: computed(function() {
        const model = this.get('serializedModel');
        const clonedModel = $.extend(true, {}, model);
        const cleanedModel = removeKeysFromObject(clonedModel, omittedModelProps, true);
        return JSON.stringify(cleanedModel, null, 2);
    }).volatile(),

    async toggleAssessment() {
        const model = get(this, 'model');
        try {
            model.toggleProperty('enabled');
            const result = await model.save();
            get(this, 'notify').success(get(this, 'i18n').t(get(model, 'enabled') ? 'admin.activated' : 'admin.deactivated'));
            return result;
        } catch(error) {
            model.toggleProperty('enabled');
            set(this, 'submitValidationFailed', true);
            get(this, 'notify').error(get(this, 'i18n').t('admin.activateError'));
            return reject(error);
        }
    },

    actions: {
        copySuccess() {
            get(this, 'notify').success(get(this, 'i18n').t('admin.assessmentDetails.copySuccess'));
        },

        copyError() {
            get(this, 'notify').error(get(this, 'i18n').t('admin.assessmentDetails.copyError'));
        },

        exportAssessment() {
            return this.downloadFile('download/assessments', {
                id: get(this, 'model.id')
            });
        },

        toggleAssessment() {
            return this.toggleAssessment();
        }
    }
});
