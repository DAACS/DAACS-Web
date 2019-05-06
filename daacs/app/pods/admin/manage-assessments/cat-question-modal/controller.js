import Ember from 'ember';
import LikertQuestionModal from 'daacs/pods/admin/manage-assessments/likert-question-modal/controller';

const {
    A,
    get,
    getWithDefault,
    set,
    computed,
    isBlank,
    inject: {
        service
    }
} = Ember;

export default LikertQuestionModal.extend({
    store: service(),

    validations: {
        'model.domainId': {presence: true},
        'model.question': {presence: true},
        'hasAnswerWithNoScoreOrText': {absence: {message: ' and points can\'t be blank'}}
    },

    hasAnswerWithNoScoreOrText: computed('model.possibleItemAnswers.@each.{score,content}', function() {
        return getWithDefault(this, 'model.possibleItemAnswers', A()).find(answer => isBlank(get(answer, 'score')) || isBlank(get(answer, 'content')));
    }),

    actions: {
        reorderAnswers(answers) {
            set(this, 'model.possibleItemAnswers', answers);
        },

        removeAnswer(answer) {
            get(this, 'model.possibleItemAnswers').removeObject(answer);
        },

        addAnswer() {
            const answer = get(this, 'store').createRecord('item-answer');
            get(this, 'model.possibleItemAnswers').pushObject(answer);
        }
    }
});
