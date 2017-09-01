import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import AssessmentRouteMixin from 'daacs/mixins/assessment-route';
import CheckAbilities from 'daacs/mixins/check-abilities';

const {
    isEmpty,
    RSVP: { reject }
} = Ember;

export default AuthenticatedRoute.extend(AssessmentRouteMixin, CheckAbilities, {
    abilitiesRequired: ['assessments.take'],

    titleToken(model) {
        return `${this.get('i18n').t('assessment.label')}: ${model.get('assessmentLabel')}`;
    },

    async model(params, transition) {
        let assessmentContent = this.get('assessmentContent');

        try {
            //look for a latest user assessment summary w/a status of IN_PROGRESS
            //if one is found, just redirect to the assessment/take route w/ that model
            let summary = await this.getExistingUserAssessment(assessmentContent.get('assessmentCategory'));
            transition.abort();
            this.replaceWith('assessments.take', summary.get('lowerCaseCategory'));
        } catch(error) {
            //otherwise attempt to create a new user assessment
            return await this.createNewUserAssessment(assessmentContent.get('id'));
        }
    },

    async getExistingUserAssessment(assessmentCategory) {
        try {
            let summary = await this.store.queryRecord('user-assessment-summary', {
                assessmentCategory,
                limit: 1
            });

            if(isEmpty(summary) || !summary.get('isInProgress')) {
                return reject({errors: [{code: 'assessment.doesNotExist'}]});
            } else {
                return summary;
            }
        } catch(error) {
            return reject(error);
        }
    },

    async createNewUserAssessment(assessmentId) {
        try {
            //attempt to create a new user assessment for the given assessment ID
            let userAssessment = this.store.createRecord('user-assessment', {assessmentId});

            return await userAssessment.save();
        } catch(error) {
            return reject(error);
        }
    }
});
