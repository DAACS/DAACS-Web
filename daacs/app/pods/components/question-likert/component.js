import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['question-likert'],

    questions: Ember.computed.alias('questionGroup.items'),
    answerTexts: Ember.computed.mapBy('questions.firstObject.possibleItemAnswers', 'content'),

    answerColumnWidth: Ember.computed('answerTexts.length', function() {
        //the answer cells should evenly use no more than 60% of the grid width
        return `${(60 / this.get('answerTexts.length')).toFixed(1)}%`;
    }),

    userHasEnteredData: Ember.computed('questions.@each.selectedAnswer', function() {
        //user has entered data if at least one question in the group has a selected answer
        return !Ember.isEmpty(this.get('questions').find((item) => {
            return !Ember.isEmpty(item.get('selectedAnswer'));
        }));
    }),

    questionIsCompleted: Ember.computed('questions.@each.selectedAnswer', function() {
        //the question group is completed if all questions have a chosen answer
        return Ember.isEmpty(this.get('questions').find((item) => {
            return Ember.isEmpty(item.get('selectedAnswer'));
        }));
    }),

    tableColumns: Ember.computed('answerTexts', 'answerColumnWidth', function() {
        const cols = this.get('answerTexts').map((text, index) => {
            return {
                valuePath: `answer${index}`,
                label: text,
                cellComponent: 'table-radio-cell',
                classNames: 'likert-table-answer-header',
                cellClassNames: 'cell-radio',
                radioValuePath: `answer${index}.id`,
                radioGroupValuePath: 'questionItem.selectedAnswer.id',
                radioNamePath: 'questionItem.id',
                width: this.get('answerColumnWidth'),
                align: 'center',
                sortable: false
            }
        });

        cols.unshiftObject({
            valuePath: 'questionItem.question',
            classNames: 'likert-table-question-header',
            sortable: false
        });

        return cols;
    }),

    tableRows: Ember.computed.map('questions', function(question) {
        const row = Ember.Object.create({
            questionItem: question
        });

        question.get('possibleItemAnswers').forEach((answer, index) => {
            row.set(`answer${index}`, answer);
        });

        return row;
    }),

    actions: {
        onSelectAnswer(radioValue, row, selectedAnswer) {
            row.get('questionItem').set('selectedAnswer', selectedAnswer);

            //notify the parent view that the answer has changed, along with booleans
            //that indicate whether the user has entered data, and whether or not the
            //question group as a whole is completed and ready for submission
            if(this.attrs.onAnswerChange) {
                this.attrs.onAnswerChange(
                    this.get('questions'),
                    this.get('userHasEnteredData'),
                    this.get('questionIsCompleted')
                );
            }
        }
    }
});
