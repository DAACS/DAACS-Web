import Ember from 'ember';
import EmberValidations from 'ember-validations';
import assessmentErrors from 'daacs/macros/assessment-errors';

const {
    A,
    get,
    set,
    assign,
    computed,
    isArray,
    inject: { service },
    computed: { or, notEmpty, readOnly },
    RSVP: { reject }
} = Ember;

export default Ember.Mixin.create(EmberValidations, {
    notify: service(),
    submitValidationFailed: false,

    validations: {
        'model.label': {
            presence: true
        },
        'model.assessmentCategory': {
            presence: true
        },
        'model.assessmentType': {
            presence: true
        },
        'model.scoringType': {
            presence: true
        }
    },

    noLabel: notEmpty('errors.model.label'),
    noCategory: notEmpty('errors.model.assessmentCategory'),
    noType: notEmpty('errors.model.assessmentType'),
    noScoringType: notEmpty('errors.model.scoringType'),

    generalApiErrors: assessmentErrors('errorMessages', 'general'),
    contentApiErrors: assessmentErrors('errorMessages', 'content'),
    rubricApiErrors: assessmentErrors('errorMessages', 'rubric'),
    domainsApiErrors: assessmentErrors('errorMessages', 'domains'),
    questionsApiErrors: assessmentErrors('errorMessages', 'questions'),

    generalHasApiErrors: notEmpty('generalApiErrors'),
    contentHasApiErrors: notEmpty('contentApiErrors'),
    rubricHasApiErrors: notEmpty('rubricApiErrors'),
    domainsHasApiErrors: notEmpty('domainsApiErrors'),
    questionsHasApiErrors: notEmpty('questionsApiErrors'),

    generalHasErrors: or('generalHasApiErrors', 'noLabel', 'noCategory', 'noType', 'noScoringType'),
    contentHasErrors: readOnly('contentHasApiErrors'),
    rubricHasErrors: readOnly('rubricHasApiErrors'),
    domainsHasErrors: readOnly('domainsHasApiErrors'),
    questionsHasErrors: readOnly('questionsHasApiErrors'),

    errorMessages: computed('model.errors.errors.@each.{code,meta}', function() {
        const errors = get(this, 'model.errors.errors') || A();
        return errors.map(err => {
            const msg = get(err, 'message');
            const parentCode = get(msg, 'code');
            const field = (get(msg, 'meta.field') || '').replace(/\[\d+\]/gi, '');
            const fieldCode = get(msg, 'meta.code');
            const code = `serverError.codes.${parentCode}${field ? `.${field}` : ''}${fieldCode ? `.${fieldCode}` : ''}`;
            return assign({}, msg, {code, parentCode});
        });
    }),

    submitError() {
        set(this, 'submitValidationFailed', true);
        get(this, 'notify').error(get(this, 'i18n').t('admin.editAssessment.submitError'));
    },

    async save() {
        try {
            const model = get(this, 'model');
            const result = await model.save();
            this.unloadNewChildModels(model);
            set(this, 'submitValidationFailed', false);
            get(this, 'notify').success(get(this, 'i18n').t('admin.editAssessment.submitSuccess'));
            return result;
        } catch(error) {
            set(this, 'submitValidationFailed', true);
            get(this, 'notify').error(get(this, 'i18n').t('admin.editAssessment.submitError'));
            return reject(error);
        }
    },

    //ember-data has a gotcha/limitation where if you are saving new nested models
    //via a hasMany() relationship, the models returned by the server (which now have IDs)
    //cannot be merged with the local models since it doesnt't know which is which,
    //so it just keeps both. we work around this by unloading the local ID-less models
    //after a successful save operation
    unloadNewChildModels(assessment) {
        const domains = get(assessment, 'domains');
        const itemGroups = get(assessment, 'itemGroups');

        if(isArray(domains)) {
            domains.forEach(domain => get(domain, 'subDomains').filterBy('isNew').invoke('deleteRecord'));
            domains.filterBy('isNew').invoke('deleteRecord');
        }

        if(isArray(itemGroups)) {
            itemGroups.filterBy('isNew').invoke('deleteRecord');
            itemGroups.forEach(itemGroup => {
                get(itemGroup, 'possibleItemAnswers').filterBy('isNew').invoke('deleteRecord');
                get(itemGroup, 'items').filterBy('isNew').invoke('deleteRecord');
                get(itemGroup, 'items').forEach(item => {
                    get(item, 'possibleItemAnswers').filterBy('isNew').invoke('deleteRecord');
                });
            });
        }
    },

    actions: {
        save() {
            return this.save();
        },

        submitError() {
            return this.submitError();
        },

        registerValidator(validator) {
            set(this, 'validator', validator);
        }
    }
});
