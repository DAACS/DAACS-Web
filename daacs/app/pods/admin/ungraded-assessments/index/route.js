import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import Pagination from 'daacs/mixins/route-pagination';
import { translationMacro as t } from 'ember-i18n';

export default AuthenticatedRoute.extend(CheckAbilities, Pagination, {
    advisor: Ember.inject.service(),
    abilitiesRequired: ['admin.view'],
    titleToken: t('admin.ungradedAssessments'),

    async beforeModel() {
        this._super(...arguments);

        try {
            let data = await Ember.RSVP.hash({
                assessments: this.store.findAll('assessment', {reload: true}),
                stats: this.store.findAll('assessment-stat-summary', {reload: true})
            });

            this.setProperties(data);
        } catch (error) {
            return Ember.RSVP.reject(error);
        }
    },

    model(params) {
        let queryParams = this.buildQueryParams(this.controllerFor('admin.ungraded-assessments.index'), 'serverQueryParams', 0, 10, params);
        queryParams.userId = this.get('advisor.selectedUserId');
        queryParams.status = ['COMPLETED', 'GRADING_FAILURE'];
        return this.pagingQuery('user-assessment-summary', queryParams, 'admin.ungraded-assessments.index');
    },

    async afterModel(model) {
        this._super(...arguments);

        let disableExportAll = true;

        //unless no records were found (in which case a follow up query is not needed)
        //check to see if there is at least one manually graded assessment to determine
        //if the "Export All" button should be disabled or not
        if(model.get('length') > 0) {
            let summaries = await this.store.query('user-assessment-summary', {
                limit: 1,
                offset: 0,
                scoring: 'MANUAL',
                status: ['COMPLETED', 'GRADING_FAILURE']
            });

            disableExportAll = (summaries.get('length') === 0);
        }

        this.set('disableExportAll', disableExportAll);
    },

    setupController(controller) {
        this._super(...arguments);
        controller.setProperties({
            userId: this.get('advisor.selectedUserId'),
            assessments: this.get('assessments'),
            stats: this.get('stats'),
            disableExportAll: this.get('disableExportAll')
        });
    },

    actions: {
        changeSelectedUser() {
            this.refresh();
            return false;
        }
    }
});
