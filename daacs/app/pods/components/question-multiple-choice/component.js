import Ember from 'ember';

const {
    observer,
    computed,
    computed: {
        alias,
        notEmpty,
        equal
    },
    run: {
        once
    }
} = Ember;

export default Ember.Component.extend({
    classNames: ['question-multiple-choice'],
    updateFormulasOnRender: false,

    radioInputName: computed('elementId', function() {
        return `multiple-choice-${this.get('elementId')}`;
    }),

    questionText: alias('displayedQuestion.question'),
    availableAnswers: alias('displayedQuestion.possibleItemAnswers'),
    userHasEnteredData: notEmpty('displayedQuestion.selectedAnswer'),
    questionIsCompleted: alias('userHasEnteredData'),
    hasReadingPassage: equal('displayedQuestion.itemContent.question.itemContentType', 'PASSAGE'),

    readingPassageDidChange: observer('displayedQuestion.itemContent.question.content', function() {
        once(this, this.scrollPassageToTop);
    }),

    scrollPassageToTop() {
        //if the reading passage changes for the next question, scroll the passage to the top
        if(this.get('hasReadingPassage')) {
            let newPassage = this.get('displayedQuestion.itemContent.question.content');

            if(this.get('currentPassage') !== newPassage) {
                this.set('currentPassage', newPassage);
                this.$('.question-content-container:first').scrollTop(0);
            }
        }
    },

    init() {
        this._super(...arguments);
        this.set('currentPassage', this.get('displayedQuestion.itemContent.question.content'));
    },

    actions: {
        onSelectAnswer(selectedAnswer) {
            this.get('displayedQuestion').set('selectedAnswer', selectedAnswer);
            //notify the parent view that the answer has changed, along with booleans
            //that indicate whether the user has entered data, and whether or not the
            //question group as a whole is completed and ready for submission
            if(this.attrs.onAnswerChange) {
                this.attrs.onAnswerChange(
                    [this.get('displayedQuestion')],
                    this.get('userHasEnteredData'),
                    this.get('questionIsCompleted')
                );
            }
        }
    }
});
