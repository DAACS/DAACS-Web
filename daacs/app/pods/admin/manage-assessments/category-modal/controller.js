import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModalDialog from 'daacs/mixins/modal-dialog';
import AssessmentCategories from 'daacs/constants/assessment/categories';

const {
    get,
    set,
    observer,
    isBlank,
    run: {
        scheduleOnce
    },
    inject: {
        controller,
        service
    }
} = Ember;

export default Ember.Controller.extend(EmberValidations, ModalDialog, {
    assessmentCategories: AssessmentCategories,
    notify: service(),
    assessmentsIndexController: controller('admin/manage-assessments/index'),

    validations: {
        'model.label': {
            presence: true
        },
        'model.assessmentCategory': {
            presence: true
        },
        'model.samlField': {
            presence: { 'if': 'samlFieldIsRequired' }
        },
        'model.samlValue': {
            presence: { 'if': 'samlValueIsRequired' }
        }
    },

    labelDidChange: observer('model.label', function() {
        if(get(this, 'model.isNew') && !isBlank(get(this, 'model.label'))) {
            scheduleOnce('afterRender', this, 'updateId', get(this, 'model.label'));
        }
    }),

    updateId(label) {
        const newId = label.toLowerCase().trim().replace(/[^\sa-z0-9\-]/gi, '').replace(/\s+/g, '-');
        set(this, 'model.id', newId);
    },

    samlFieldIsRequired() {
        return !isBlank(get(this, 'model.samlValue'));
    },

    samlValueIsRequired() {
        return !isBlank(get(this, 'model.samlField'));
    },

    reloadCategoryGroups() {
        get(this, 'assessmentsIndexController').reloadCategoryGroups();
    },

    actions: {
        cancel() {
            this._super(...arguments);
            get(this, 'model').rollbackAttributes();
        },

        async save() {
            const isNew = get(this, 'model.isNew');
            await get(this, 'model').save();
            await this.reloadCategoryGroups();
            this.closeModal();
            get(this, 'notify').success(get(this, 'i18n').t(isNew ? 'admin.category.createSuccess' : 'admin.category.updateSuccess'));
        },

        async remove() {
            try {
                await get(this, 'model').destroyRecord();
                await this.reloadCategoryGroups();
                this.closeModal();
                get(this, 'notify').success(get(this, 'i18n').t('admin.category.removeSuccess'));
            } catch(error) {
                get(this, 'notify').error(get(this, 'i18n').t('admin.category.removeError'));
            }
        },

        onIdBlur() {
            if(get(this, 'model.isNew')) {
                this.updateId(get(this, 'model.id'));
            }
        }
    }
});
