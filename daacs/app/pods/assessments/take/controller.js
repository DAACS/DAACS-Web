import Ember from 'ember';
import AssessmentControllerMixin from 'daacs/mixins/assessment-controller';

const {
    isArray,
    isNone,
    isEmpty,
    computed,
    computed: {
        and,
        not,
        or
    },
    inject: {
        service
    }
} = Ember;

export default Ember.Controller.extend(AssessmentControllerMixin, {
    notify: service(),
    isLoadingQuestion: false,
    hasEnteredData: false,
    confirmLoseWork: false,
    questionsAreAnswered: false,
    currentQuestionGroup: null,
    currentWritingSample: null,
    currentQuestionData: null,
    currentQuestionStartDate: null,
    completeAssessmentError: null,
    hasSubmitQuestionErrors: false,
    canSubmitAnswer: and('questionsAreAnswered', 'minBrowserResolution'),
    cannotSubmitAnswer: not('canSubmitAnswer'),
    disableNext: or('isLoadingQuestion', 'cannotSubmitAnswer'),

    currentGroupIsComplete: computed('currentQuestionGroup.items.@each.chosenItemAnswerId', function() {
        let questions = this.get('currentQuestionGroup.items');

        if(!isArray(questions)) {
            return true;
        }

        return isNone(questions.find(q => isEmpty(q.get('chosenItemAnswerId'))));
    }),

    async getNextQuestionGroup(assessmentId) {
        try {
            //only fetch the next group if the current group is completed
            if(this.get('currentGroupIsComplete')) {
                return await this.store.queryRecord('user-assessment-question-group', {
                    assessmentId,
                    limit: 1
                });
            } else {
                return this.get('currentQuestionGroup');
            }
        } catch(error) {
            return Ember.RSVP.reject(error);
        }
    },

    getDisplayedQuestion(questionGroup) {
        if(isNone(questionGroup) || !isArray(questionGroup.get('items'))) {
            return null;
        } else {
            return questionGroup.get('items').find(q => isEmpty(q.get('chosenItemAnswerId')));
        }
    },

    async updateAssessmentSummary() {
        let summary = await this.store.queryRecord('user-assessment-summary', {
            assessmentId: this.get('model.assessmentId'),
            takenDate: this.get('model.takenDateISO')
        });

        this.set('model', summary);
    },

    async setupNextQuestion() {
        const assessmentId = this.get('model.assessmentId');

        try {
            //query for the next question group for this assessment
            let questionGroup = await this.getNextQuestionGroup(assessmentId);

            this.setProperties({
                currentQuestionData: null,
                currentQuestionGroup: questionGroup,
                displayedQuestion: this.getDisplayedQuestion(questionGroup),
                currentQuestionStartDate: new Date(),
                isLoadingQuestion: false,
                hasEnteredData: false,
                questionsAreAnswered: false
            });

            //re-fetch the user-assessment-summary model so that the progress can be updated
            this.updateAssessmentSummary();

            //if no question group is returned, then the assessment is completed
            if(isEmpty(questionGroup)) {
                return this.send('completeAssessment', this.get('model'));
            }

            return questionGroup;
        } catch(error) {
            return Ember.RSVP.reject(error);
        }
    },

    async submitAnswers() {
        if(!this.get('canSubmitAnswer')) {
            this.get('notify').error(this.get('i18n').t(this.get('model.isWritingPrompt') ?
                'assessment.writingPrompt.meetMinWords' :
                'assessment.answerAllQuestions'
            ));
            
            return Ember.RSVP.reject();
        }

        this.set('isLoadingQuestion', true);
        this.set('hasSubmitQuestionErrors', false);

        //the writing prompt assessments only have 1 question,
        //so the assessment is complete after the user submits/clicks Next
        if(this.get('model.isWritingPrompt')) {
            try {
                this.get('currentQuestionData').set('completeDate', new Date());
                await this.get('currentQuestionData').save();
                this.set('hasEnteredData', false);
                return this.send('completeAssessment', this.get('model'));
            } catch(error) {
                return Ember.RSVP.reject(error);
            }
        }

        try {
            this.get('currentQuestionGroup').set('assessmentId', this.get('model.assessmentId'));

            this.get('currentQuestionData').forEach((question) => {
                let answer = question.get('selectedAnswer');

                if(answer) {
                    question.setProperties({
                        chosenItemAnswer: answer,
                        chosenItemAnswerId: answer.get('id'),
                        startDate: this.get('currentQuestionStartDate'),
                        completeDate: new Date()
                    });
                }
            });

            await this.get('currentQuestionGroup').save();
            return this.setupNextQuestion();
        } catch(error) {
            this.handleSubmitError();
            return Ember.RSVP.reject(error);
        }
    },

    handleSubmitError() {
        this.setProperties({
            hasSubmitQuestionErrors: true,
            isLoadingQuestion: false
        });

        if(this.get('model.isWritingPrompt')) {
            this.get('currentQuestionData').rollbackAttributes();
        } else {
            this.get('currentQuestionData').forEach((question) => {
                if(question.get('selectedAnswer')) {
                    question.rollbackAttributes();
                }
            });

            this.get('currentQuestionGroup').rollbackAttributes();
        }
    },

    actions: {
        onNextClick() {
            return this.submitAnswers();
        },

        onAnswerChange(currentQuestionData, hasEnteredData, questionsAreAnswered) {
            this.setProperties({
                currentQuestionData,
                hasEnteredData,
                questionsAreAnswered
            });
        },

        requestHelp() {
            this.send('openHelpDialog', this.get('model'));
        }
    }
});
