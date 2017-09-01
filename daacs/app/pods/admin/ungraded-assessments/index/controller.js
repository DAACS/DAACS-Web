import Ember from 'ember';
import Pagination from 'daacs/mixins/controller-pagination';
import Filtering from 'daacs/mixins/controller-filtering';
import FileDownload from 'daacs/mixins/file-download';
const ungradedStatuses = ['COMPLETED', 'GRADING_FAILURE'];

export default Ember.Controller.extend(Pagination, Filtering, FileDownload, {
    notify: Ember.inject.service(),
    serverQueryParams: ['status', 'scoring', 'userId'],
    status: ['COMPLETED', 'GRADING_FAILURE'],
    scoringMethodFilter: null,
    scoring: Ember.computed.alias('scoringMethodFilter.value'),
    userId: null,

    categorySummaries: Ember.computed('assessments', 'stats', function() {
        return this.get('assessments').filterBy('enabled', true).map((assessment) => {
            let numUngraded = 0,
                statSummaries = this.get('stats').filterBy('assessmentCategory', assessment.get('assessmentCategory'));

            if(!Ember.isEmpty(statSummaries)) {
                numUngraded = statSummaries.reduce((prevValue, summary) => {
                    return prevValue + summary.get('stat').reduce((prevValue, stat) => {
                        if(ungradedStatuses.indexOf(stat.get('completionStatus')) !== -1) {
                            return prevValue + stat.get('count');
                        }

                        return prevValue;
                    }, 0);
                }, 0);
            }

            return {
                label: assessment.get('label'),
                icon: assessment.get('dasherizedCategory'),
                scoringTypeLabel: `admin.scoring.${assessment.get('isManuallyScored') ? 'manualScoring' : 'automaticScoring'}`,
                numUngraded
            };
        });
    }),

    scoringMethods: Ember.computed(function() {
        return [
            { value: 'MANUAL', label: this.get('i18n').t('admin.scoring.manualScoring') },
            { value: 'AUTO', label: this.get('i18n').t('admin.scoring.automaticScoring') }
        ];
    }),

    columns: Ember.computed(function() {
        return [{
            valuePath: 'completionDateFormatted',
            label: this.get('i18n').t('admin.completionDate'),
            classNames: 'cell-auto-width-xs cell-auto-width-sm',
            cellClassNames: 'cell-valign-middle cell-auto-width-xs cell-auto-width-sm',
            width: '200px',
            sortable: false
        }, {
            valuePath: 'fullNameWithUsername',
            label: this.get('i18n').t('admin.student'),
            cellClassNames: 'cell-valign-middle',
            sortable: false
        }, {
            valuePath: 'assessmentLabel',
            label: this.get('i18n').t('admin.assessment'),
            classNames: 'hidden-small-screen',
            cellClassNames: 'hidden-small-screen cell-valign-middle',
            sortable: false,
            width: '200px'
        },
        {
            cellComponent: 'assessment-grading-actions',
            classNames: 'assessment-grading-actions',
            cellClassNames: 'assessment-grading-actions cell-valign-middle cell-slim',
            width: '160px',
            sortable: false
        }];
    }),

    async reloadStats() {
        let stats = await this.store.findAll('assessment-stat-summary', {reload: true});
        this.set('stats', stats.toArray());
    },

    async retryGrading(assessmentSummary) {
        try {
            let userAssessment = await this.store.findRecord(
                'user-assessment',
                assessmentSummary.get('id'),
                {adapterOptions: {query: {userId: assessmentSummary.get('userId')}}}
            );

            userAssessment.set('status', 'COMPLETED');
            let saveResult = await userAssessment.save({adapterOptions: {query: {userId: assessmentSummary.get('userId')}}});
            //if the grading succeeds, update the summary with the same new status so its reflected in the list UI
            let assessmentSummaryJSON = assessmentSummary.serialize();
            assessmentSummaryJSON.status = userAssessment.get('status');
            this.store.pushPayload('user-assessment-summary', {'user-assessment-summary': assessmentSummaryJSON});

            if(userAssessment.get('isCompleted')) {
                //if the server returns a status of COMPLETED, it means the request to grade was queued
                this.get('notify').info(this.get('i18n').t('admin.gradingQueued'), {closeAfter: 6000});
            } else if(userAssessment.get('isGradingFailed')) {
                //if the server returns a status of GRADING_FAILURE, it means the grading attempt failed, and is not being tried
                this.get('notify').error(this.get('i18n').t('admin.gradingFailed'), {closeAfter: 6000});
            }

            this.reloadStats();
            return saveResult;
        } catch(error) {
            this.get('notify').error(this.get('i18n').t('admin.gradingFailedUnexpected'), {closeAfter: 6000});
            return Ember.RSVP.reject(error);
        }
    },

    exportAssessment(assessmentSummary) {
        return this.downloadFile('download/user-assessments', {
            id: assessmentSummary.get('id'),
            userId: assessmentSummary.get('userId')
        });
    },

    exportAll() {
        return this.downloadFile('download/manual-grade-user-assessments');
    },

    loadModels() {
        //update the stats whenever user assessment models are loaded to make sure the counts are up-to-date
        this.reloadStats();
        this._super(...arguments);
    },

    actions: {
        retryGrading(assessmentSummary) {
            return this.retryGrading(assessmentSummary);
        },

        exportAssessment(assessmentSummary) {
            return this.exportAssessment(assessmentSummary);
        },

        exportAll() {
            return this.exportAll();
        },

        onScoringMethodChange(scoringMethod) {
            this.set('scoringMethodFilter', scoringMethod);
            this.filterModels();
        }
    }
});
