import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
    validations: {
        'item.question': {presence: true},
        'itemAnswerContents': {'string-array': true},
        'itemQuestionContent': {
            presence: {
                'if'(object) {
                    //only add a validation rule for question content if the question already has content defined
                    return !!object.get('item.itemContent.question');
                }
            }
        },
        'itemFeedbackContent': {
            presence: {
                'if'(object) {
                    //only add a validation rule for feedback content for multiple choice type assessments
                    //and only if the question already has feedback content defined
                    return object.get('assessment.isMultipleChoice') && !!object.get('item.itemContent.feedback');
                }
            }
        }
    },

    itemQuestionContent: Ember.computed.alias('item.itemContent.question.content'),
    itemFeedbackContent: Ember.computed.alias('item.itemContent.feedback.content'),
    itemAnswerContents: Ember.computed('item.possibleItemAnswers.@each.content', function() {
        return this.get('item.possibleItemAnswers').map(answer => answer.get('content'));
    })
});
