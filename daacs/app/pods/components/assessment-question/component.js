import Ember from 'ember';

const questionTypes = {
    CAT: 'question-multiple-choice',
    MULTIPLE_CHOICE: 'question-multiple-choice',
    LIKERT: 'question-likert',
    WRITING_PROMPT: 'question-writing-prompt'
};

export default Ember.Component.extend({
    classNames: ['assessment-question'],
    type: null,

    questionCmp: Ember.computed('type', function() {
        return questionTypes[this.get('type')];
    })
});
