import Ember from 'ember';

const {
    computed,
    isArray
} = Ember;

export default Ember.Component.extend({
    tagName: 'tr',
    classNameBindings: ['isReverseScored'],

    isReverseScored: computed('questionItem.possibleItemAnswers.@each.score', function() {
        const answers = this.get('questionItem.possibleItemAnswers');

        if(isArray(answers)) {
            return answers.get('firstObject.score') > answers.get('lastObject.score');
        } else {
            return false;
        }
    }),

    chosenAnswer: computed('questionItem.possibleItemAnswers.[]', 'questionItem.chosenItemAnswerId', function() {
        return this.get('questionItem.possibleItemAnswers').findBy('id', this.get('questionItem.chosenItemAnswerId'));
    }),

    answerColumnStyle: computed('questionItem.possibleItemAnswers.length', 'media.isMobile', 'media.isTablet', function () {
        let availWidth = this.get('media.isMobile') || this.get('media.isTablet') ? 100 : 60;
        return `width: ${Math.floor(availWidth / this.get('questionItem.possibleItemAnswers.length'))}%;`;
    }),

    answerColumns: computed('isReverseScored', 'chosenAnswer', 'questionItem.possibleItemAnswers.[]', function() {
        let columns = [],
            answers = this.get('questionItem.possibleItemAnswers'),
            isReverseScored = this.get('isReverseScored');

        if(isArray(answers)) {
            let isFilled = !isReverseScored;

            answers.forEach((answer) => {
                let isChosenAnswer = (answer === this.get('chosenAnswer')),
                    answerText = answer.get('content');

                columns.pushObject({
                    isChosenAnswer,
                    isFilled,
                    answerText
                });

                if(isChosenAnswer) {
                    isFilled = isReverseScored;
                }
            });
        }

        return columns;
    })
});
