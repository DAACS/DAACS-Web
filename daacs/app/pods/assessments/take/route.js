import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import AssessmentRouteMixin from 'daacs/mixins/assessment-route';
import CheckAbilities from 'daacs/mixins/check-abilities';

const {
    isEmpty,
    RSVP: {
        reject,
        resolve
    }
} = Ember;

export default AuthenticatedRoute.extend(AssessmentRouteMixin, CheckAbilities, {
    abilitiesRequired: ['assessments.take'],
    currentQuestionGroup: null,

    titleToken(model) {
        return `${this.get('i18n').t('assessment.label')}: ${model.get('assessmentLabel')}`;
    },

    async beforeModel() {
        await this._super(...arguments);
        //clear any existing question-related records cached to the local store before starting the asssessment
        this.store.unloadAll('user-assessment-question-group');
        this.store.unloadAll('question-group-item');
        this.store.unloadAll('item-answer');
    },

    model(params, transition) {
        return this.getExistingUserAssessment(this.get('assessmentContent'), transition);
    },

    async afterModel(model) {
        this._super(...arguments);
        //make sure we have the correct assessment-content for the current user-assessment
        //(in case a new assessment was activated while this assessment is still in-progress)
        let assessmentContent = await this.store.findRecord('assessment-content', model.get('assessmentId'), {reload: true});
        this.set('assessmentContent', assessmentContent);

        //if this is a writing prompt assessment, get the associated
        //user-assessment-writing-sample model instead of the next question group
        if(model.get('isWritingPrompt')) {
            return this.getWritingSample(model.get('assessmentId'));
        } else {
            return this.getNextQuestionGroup(model.get('assessmentId'));
        }
    },

    async getExistingUserAssessment(assessmentContent, transition) {
        try {
            let summary = await this.store.queryRecord('user-assessment-summary', {
                assessmentCategory: assessmentContent.get('assessmentCategory'),
                limit: 1
            });

            if(isEmpty(summary) || !summary.get('isInProgress')) {
                //if no matching in-progress user assessment summary was found, redirect to assessment landing
                transition.abort();
                this.replaceWith('assessments.index', assessmentContent.get('lowerCaseCategory'));
            } else {
                return summary;
            }
        } catch(error) {
            transition.abort();
            return this.replaceWith('assessments.index', assessmentContent.get('lowerCaseCategory'));
        }
    },

    async getNextQuestionGroup(assessmentId) {
        try {
            let questionGroup = await this.store.queryRecord('user-assessment-question-group', {
                assessmentId,
                limit: 1
            });

            this.set('currentQuestionGroup', questionGroup);
            return questionGroup;
        } catch(error) {
            return reject(error);
        }
    },

    async getWritingSample(assessmentId) {
        try {
            let writingSample = await this.store.queryRecord('user-assessment-writing-sample', {
                assessmentId,
                limit: 1
            });

            writingSample.set('assessmentId', assessmentId);
            //if the model doesn't have a startDate yet, set it as the current date
            if(isEmpty(writingSample.get('startDate'))) {
                writingSample.set('startDate', new Date());
            }

            this.set('currentWritingSample', writingSample);
            return writingSample;
        } catch(error) {
            return reject(error);
        }
    },

    async completeAssessment(assessmentSummary) {
        //immediately set the assessment summary progress to 100% so the UI is updated while the user waits
        assessmentSummary.set('progressPercentage', 1);

        try {
            //set the status of the user assessment to "COMPLETED"
            let userAssessment = await this.store.findRecord('user-assessment', assessmentSummary.get('id'));

            userAssessment.set('status', 'COMPLETED');
            await userAssessment.save();

            return resolve(this.replaceWith(
                'assessments.index',
                assessmentSummary.get('lowerCaseCategory'),
                {queryParams: {
                    finished: true,
                    takenDate: assessmentSummary.get('takenDateISO')
                }})
            );
        } catch(errors) {
            this.controller.set('completeAssessmentError', errors);
            return reject(errors);
        }
    },

    setupController(controller, model) {
        this._super(...arguments);
        let questionGroup = this.get('currentQuestionGroup');
        let writingSample = this.get('currentWritingSample');
        let assessmentContent = this.get('assessmentContent');

        //if no question group/writing sample was returned, assume the assessment is complete
        if(isEmpty(questionGroup) && isEmpty(writingSample)) {
            return this.completeAssessment(model);
        }

        controller.setProperties({
            currentQuestionGroup: questionGroup,
            displayedQuestion: controller.getDisplayedQuestion(questionGroup),
            currentWritingSample: writingSample,
            currentQuestionStartDate: new Date(),
            assessmentContent
        });
    },

    resetController(controller, isExiting) {
        if(isExiting) {
            controller.setProperties({
                isLoadingQuestion: false,
                hasEnteredData: false,
                confirmLoseWork: false,
                questionsAreAnswered: false,
                currentQuestions: null,
                currentQuestionGroup: null,
                currentWritingSample: null,
                currentQuestionStartDate: null,
                completeAssessmentError: null,
                hasSubmitQuestionErrors: false
            });
        }
    },

    confirmLeaveUnsavedWork(attemptedAction) {
        //if the user hasn't entered anything or if they confirmed the loss of work,
        //let transitions proceed normally
        if(!this.controller.get('hasEnteredData') || this.controller.get('confirmLoseWork')) {
            return true;
        }

        //otherwise, ask them to confirm that they want to abandon the unsaved work
        this.send(
            'openModal',
            'assessments/confirm-leave-modal',
            attemptedAction,
            'assessments/confirm-leave-modal'
        );

        return false;
    },

    actions: {
        willTransition(transition) {
            if(!this.confirmLeaveUnsavedWork('transition')) {
                this.set('abortedTransition', transition);
                transition.abort();
            } else {
                return true;
            }
        },

        confirmedLoseWork(action) {
            this.controller.set('confirmLoseWork', true);
            if(action === 'transition' && this.get('abortedTransition')) {
                this.get('abortedTransition').retry();
            } else {
                this.send(action);
            }
        },

        invalidateSession() {
            //catch the logout action on this route so that we can confirm leaving unsaved changes
            //if there is no unsaved work or the user confirms the action, returns true so the route
            //action will bubble to the application route, otherwise the action won't propagate
            return this.confirmLeaveUnsavedWork('invalidateSession');
        },

        completeAssessment(assessmentSummary) {
            this.completeAssessment(assessmentSummary);
        }
    }
});
