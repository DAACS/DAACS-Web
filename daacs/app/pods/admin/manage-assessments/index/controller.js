import Ember from 'ember';

const {
    get,
    set,
    isEmpty,
    computed,
    computed: {
        filterBy,
        sort
    },
    RSVP
} = Ember;

export default Ember.Controller.extend({
    notify: Ember.inject.service(),
    categoryFilter: null,

    sortedCategoryGroups: sort('categoryGroups', 'categoryGroupSorting'),
    categoryGroupSorting: ['label'],

    assessmentsWithStats: computed('model.@each.id', 'stats.@each.{id,completionStatus}', function() {
        const assessments = get(this, 'model');
        const stats = get(this, 'stats');
        return assessments.map((assessment) => {
            let numCompletions = 0;
            let statsSummary = stats.findBy('id', get(assessment, 'id'));

            if(statsSummary && !isEmpty(get(statsSummary, 'stat'))) {
                numCompletions = get(statsSummary, 'stat').reduce((prevValue, stat) => {
                    if(get(stat, 'completionStatus') !== 'IN_PROGRESS') {
                        return prevValue + get(stat, 'count');
                    }

                    return prevValue;
                }, 0);
            }

            set(assessment, 'numCompletions', numCompletions);
            return assessment;
        });
    }),

    categoryGroupsWithStats: computed('activeAssessments.[]', 'sortedCategoryGroups.[]', function() {
        const groups = get(this, 'sortedCategoryGroups');
        const activeAssessments = get(this, 'activeAssessments');
        return groups.map(group => {
            const assessments = activeAssessments.filterBy('assessmentCategoryGroup.id', get(group, 'id'));
            return { group, assessments };
        });
    }),

    activeAssessments: filterBy('assessmentsWithStats', 'enabled', true),

    filteredAssessments: computed('assessmentsWithStats', 'categoryFilter', function() {
        let cat = get(this, 'categoryFilter');
        let models = get(this, 'assessmentsWithStats');
        return cat ? models.filterBy('assessmentCategoryGroup.id', get(cat, 'id')) : models;
    }),

    sortedAssessments: sort('filteredAssessments', 'assessmentsSorting'),
    assessmentsSorting: ['createdDate:desc'],

    revisionColumns: computed(function() {
        return [{
            valuePath: 'createdDateFormatted',
            label: get(this, 'i18n').t('admin.createdDate'),
            cellClassNames: 'cell-valign-middle',
            sortable: false
        }, {
            valuePath: 'label',
            label: get(this, 'i18n').t('admin.assessmentLabel'),
            classNames: 'cell-valign-middle',
            cellClassNames: 'cell-valign-middle',
            sortable: false
        }, {
            valuePath: 'numUserCompletionsText',
            label: get(this, 'i18n').t('admin.results'),
            classNames: 'cell-valign-middle hidden-small-screen',
            cellClassNames: 'cell-valign-middle hidden-small-screen',
            width: '140px',
            sortable: false
        }, {
            valuePath: 'enabled',
            cellComponent: 'assessment-status-cell',
            label: get(this, 'i18n').t('admin.status'),
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
            set(this, 'model', assessments);
            get(this, 'notify').success(get(this, 'i18n').t(enable ? 'admin.activated' : 'admin.deactivated'));
        } catch(error) {
            assessment.rollbackAttributes();
            get(this, 'notify').error(get(this, 'i18n').t('admin.activateError'));
            return RSVP.reject(error);
        }
    },

    async reloadCategoryGroups() {
        const categoryGroups = await this.store.query('assessment-category-group', {});
        set(this, 'categoryGroups', categoryGroups);
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
        },

        openAddCategoryGroup() {
            const model = this.store.createRecord('assessment-category-group', {});

            this.send(
                'openModal',
                'admin/manage-assessments/category-modal',
                model,
                'admin/manage-assessments/category-modal'
            );
        },

        openEditCategoryGroup(model) {
            this.send(
                'openModal',
                'admin/manage-assessments/category-modal',
                model,
                'admin/manage-assessments/category-modal'
            );
        }
    }
});
