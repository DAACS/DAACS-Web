import Ember from 'ember';

const {
    isEmpty,
    inject: { service }
} = Ember;

export default Ember.Mixin.create({
    advisor: service(),

    queryParams: {
        takenDate: { refreshModel: true }
    },

    async model(params, transition) {
        let query = {assessmentCategoryGroupId: transition.params.assessments.assessment_category};
        let userId = this.get('advisor.selectedUserId');

        //get the most recent completed assessment if a specific taken date is not provided
        if(params.takenDate) {
            query.takenDate = params.takenDate;
        } else {
            query.limit = 1;
        }

        //only allow advisors/admins to specify a userId
        if(!isEmpty(userId) && this.can('assessments.selectUser')) {
            query.userId = userId;
        }

        try {
            return await this.store.queryRecord('user-assessment-summary', query);
        } catch(error) {
            //if no assessment summary was found, just display the page's "empty state"
            return null;
        }
    },

    async afterModel(model, transition) {
        this._super(...arguments);

        let assessmentContent = await this.store.findRecord('assessment-content', model.get('assessmentId'), {reload: true});
        let userId = this.get('advisor.selectedUserId');
        this.set('assessmentContent', assessmentContent);

        //if a takenDate is provided, get the latest assessment to check its status
        //to determine if the user is allowed to retake the assessment or not
        if(!isEmpty(transition.queryParams.takenDate)) {
            let query = {
                assessmentCategoryGroupId: this.get('assessmentContent.assessmentCategoryGroup.id'),
                limit: 1
            };

            //only allow advisors/admins to specify a userId
            if(!isEmpty(userId) && this.can('assessments.selectUser')) {
                query.userId = userId;
            }

            let summary = await this.store.queryRecord('user-assessment-summary', query);

            this.set('latestSummary', summary);
        } else {
            this.set('latestSummary', model);
        }

        //for WRITING_PROMPT type assessments, the writing sample is displayed on the results pages
        if(model.get('isWritingPrompt')) {
            let query = {
                assessmentId: model.get('assessmentId'),
                takenDate: model.get('takenDate').toISOString()
            };

            //only allow advisors/admins to specify a userId
            if(!isEmpty(userId) && this.can('assessments.selectUser')) {
                query.userId = userId;
            }

            let writingSample = await this.store.queryRecord('user-assessment-writing-sample-answer', query);
            this.set('writingSample', writingSample);
            return writingSample;
        }
    },

    setupController(controller, model) {
        this._super(...arguments);
        let assessmentContent = this.get('assessmentContent');
        let takenDatesQuery = {assessmentCategoryGroupId: assessmentContent.get('assessmentCategoryGroup.id')};
        let userId = this.get('advisor.selectedUserId');

        if(!isEmpty(userId) && this.can('assessments.selectUser')) {
            takenDatesQuery.userId = userId;
        }

        controller.setProperties({
            takenDates: this.store.query('user-assessment-taken-date', takenDatesQuery),
            latestSummary: this.get('latestSummary'),
            writingSample: this.get('writingSample'),
            assessmentContent
        });

        if(model && model.get('isFinished')) {
            controller.set('selectedTakenDate', model.get('takenDateISO'));
        }
    },

    resetController(controller, isExiting) {
        this._super(...arguments);
        if(isExiting) {
            controller.setProperties({
                takenDate: null,
                selectedTakenDate: null
            });
        }
    }
});
