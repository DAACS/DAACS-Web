import Ember from 'ember';
import { CanMixin } from 'ember-can';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import ScrollReset from 'daacs/mixins/scroll-reset';
import UserAssessmentRoute from 'daacs/mixins/user-assessment-route';

const { isEmpty } = Ember;

export default AuthenticatedRoute.extend(CanMixin, ScrollReset, UserAssessmentRoute, {
    titleToken() {
        let assessmentContent = this.get('assessmentContent');
        let token = assessmentContent.get('label');
        let domain = assessmentContent.get('domains').findBy('id', this.get('domainId'));

        if(domain) {
            token = `${domain.get('label')} - ${token}`;
        }

        return token;
    },

    async beforeModel(transition) {
        this.set('domainId', transition.params['assessments.domain.index'].domain_id);
        await this._super(...arguments);
    },

    async afterModel(model, transition) {
        await this._super(...arguments);

        //if the assessment was not found or is not graded, redirect to the assesment landing
        if(isEmpty(model) || !model.get('isGraded')) {
            return this.transitionTo('assessments.index');
        }

        //validate that the domain exists
        let domain = model.get('domainScores').findBy('domainId', this.get('domainId'));

        if(!domain) {
            return this.transitionTo('assessments.index');
        }

        this.set('domain', domain);

        //build the query to fetch the associated question response data
        let userId = this.get('advisor.selectedUserId'),
            query = {assessmentId: model.get('assessmentId')};

        //get the data for most recent completed assessment if a specific taken date is not provided
        if(transition.queryParams.takenDate) {
            query.takenDate = transition.queryParams.takenDate;
        } else {
            query.limit = 1;
        }

        //only allow advisors/admins to specify a userId
        if(!isEmpty(userId) && this.can('assessments.selectUser')) {
            query.userId = userId;
        }

        if(model.get('isMultipleChoiceLike') || model.get('isLikert')) {
            //for CAT/LIKERT type assessments, the questions/answers associated
            //with the domain are displayed in the domain details page
            query.domainId = this.get('domainId');
            let questionGroups = await this.store.query('user-assessment-question-answer', query);
            this.set('questionGroups', questionGroups);
            return questionGroups;
        }
    },

    setupController(controller) {
        this._super(...arguments);
        controller.setProperties(this.getProperties(
            'domain',
            'questionGroups'
        ));
    }
});
