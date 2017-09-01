import Ember from 'ember';

export default Ember.Controller.extend({
    notify: Ember.inject.service(),
    categoryFilter: null,

    categoryFilterOptions: Ember.computed(function() {
        return [
            {value: 'MATHEMATICS', label: this.get('i18n').t('admin.categories.mathematics')},
            {value: 'READING', label: this.get('i18n').t('admin.categories.reading')},
            {value: 'COLLEGE_SKILLS', label: this.get('i18n').t('admin.categories.srl')},
            {value: 'WRITING', label: this.get('i18n').t('admin.categories.writing')}
        ]
    }),

    activeAssessments: Ember.computed.filterBy('model', 'enabled', true),

    filteredAssessments: Ember.computed('model', 'categoryFilter', function() {
        let cat = this.get('categoryFilter'),
            models = this.get('model');

        return cat ? models.filterBy('assessmentCategory', cat.value) : models;
    }),

    sortedAssessments: Ember.computed.sort('filteredAssessments', 'assessmentsSorting'),
    assessmentsSorting: ['createdDate:desc'],

    revisionColumns: Ember.computed(function() {
        return [{
            valuePath: 'createdDateFormatted',
            label: this.get('i18n').t('admin.createdDate'),
            cellClassNames: 'cell-valign-middle',
            sortable: false
        }, {
            valuePath: 'label',
            label: this.get('i18n').t('admin.assessmentLabel'),
            classNames: 'cell-valign-middle',
            cellClassNames: 'cell-valign-middle',
            sortable: false
        }, {
            valuePath: 'numUserCompletionsText',
            label: this.get('i18n').t('admin.results'),
            classNames: 'cell-valign-middle hidden-small-screen',
            cellClassNames: 'cell-valign-middle hidden-small-screen',
            width: '140px',
            sortable: false
        }, {
            valuePath: 'enabled',
            cellComponent: 'assessment-status-cell',
            label: this.get('i18n').t('admin.status'),
            classNames: 'cell-valign-middle hidden-small-screen',
            cellClassNames: 'cell-valign-middle hidden-small-screen',
            width: '95px',
            sortable: false
        }, {
            cellComponent: 'assessment-mgmt-actions',
            classNames: 'assessment-mgmt-actions assessment-grading-actions',
            cellClassNames: 'assessment-mgmt-actions assessment-grading-actions cell-valign-middle cell-slim',
            width: '185px',
            sortable: false
        }];
    }),

    async toggleAssessment(assessment, enable) {
        try {
            assessment.set('enabled', enable);
            await assessment.save();
            let assessments = await this.store.findAll('assessment', {reload: true});
            this.set('model', assessments);
            this.get('notify').success(this.get('i18n').t(enable ? 'admin.activated' : 'admin.deactivated'));
        } catch(error) {
            assessment.rollbackAttributes();
            this.get('notify').error(this.get('i18n').t('admin.activateError'));
            return Ember.RSVP.reject(error);
        }
    },

    actions: {
        toggleAssessment(assessment, enable) {
            return this.toggleAssessment(assessment, enable);
        },

        openImportModal() {
            this.send(
                'openModal',
                'admin/manage-assessments/import-modal',
                null,
                'admin/manage-assessments/import-modal'
            );
        }
    }
});
