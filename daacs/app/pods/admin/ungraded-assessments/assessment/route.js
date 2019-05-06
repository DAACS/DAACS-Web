import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import DataRoute from 'ember-data-route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import { translationMacro as t } from 'ember-i18n';

export default AuthenticatedRoute.extend(DataRoute, CheckAbilities, ScrollReset, {
    abilitiesRequired: ['admin.grade'],
    titleToken: t('admin.manualGrade.assessment'),

    async model(params) {
        try {
            let userAssessment = await this.store.findRecord(
                'user-assessment',
                params.user_assessment_id,
                {adapterOptions: {query: {userId: params.user_id}}}
            );

            //only WRITING_PROMPT type assessments that are completed can be manually graded
            if(!userAssessment.get('isWritingPrompt') || !userAssessment.get('isFinished')) {
                return Ember.RSVP.reject({errors: [{status: '404'}]});
            }

            return userAssessment;
        } catch(error) {
            return Ember.RSVP.reject(error);
        }
    },

    async afterModel(model) {
        this._super(...arguments);
        let assessmentContent = await this.store.findRecord('assessment-content', model.get('assessmentId'), {reload: true});
        this.set('assessmentContent', assessmentContent);
    },

    setupController(controller) {
        this._super(...arguments);

        controller.setProperties({
            assessmentContent: this.get('assessmentContent')
        });
    },

    resetController(controller, isExiting) {
        this._super(...arguments);
        if(isExiting) {
            controller.get('assessmentContent.domains').setEach('selectedDomainScore', null);
        }
    }
});
