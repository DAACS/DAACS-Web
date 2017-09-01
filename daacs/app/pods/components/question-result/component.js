import Ember from 'ember';

const {
    isNone,
    computed,
    computed: {
        alias,
        equal
    },
    inject: { service }
} = Ember;


export default Ember.Component.extend({
    i18n: service(),
    userEvents: service('user-events'),
    classNames: ['question-result', 'media'],
    imgRegex: /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g,
    isExpanded: false,

    questionText: alias('questionItem.questionNoImages'),
    hasReadingPassage: equal('questionItem.itemContent.question.itemContentType', 'PASSAGE'),

    questionImages: computed('questionItem.question', function () {
        let result = this.get('imgRegex').exec(this.get('questionItem.question'));
        return result ? result.slice(1) : null;
    }),

    correctAnswer: computed('questionItem.possibleItemAnswers.[]', function() {
        return this.get('questionItem.possibleItemAnswers').findBy('score', 1);
    }),

    correctAnswerText: computed('correctAnswer.content', function() {
        const text = this.get('correctAnswer.content');
        return !isNone(text) ? text.replace(this.get('imgRegex'), '') : text;
    }),

    correctAnswerImages: computed('correctAnswer.content', function () {
        let result = this.get('imgRegex').exec(this.get('correctAnswer.content'));
        return result ? result.slice(1) : null;
    }),

    chosenAnswer: computed('questionItem.possibleItemAnswers.[]', 'questionItem.chosenItemAnswerId', function() {
        return this.get('questionItem.possibleItemAnswers').findBy('id', this.get('questionItem.chosenItemAnswerId'));
    }),

    chosenAnswerText: computed('chosenAnswer.content', function() {
        const text = this.get('chosenAnswer.content');
        return !isNone ? text.replace(this.get('imgRegex'), '') : text;
    }),

    chosenAnswerImages: computed('chosenAnswer.content', function () {
        let result = this.get('imgRegex').exec(this.get('chosenAnswer.content'));
        return result ? result.slice(1) : null;
    }),

    isCorrect: computed('questionItem.chosenItemAnswerId', 'correctAnswer.id', function() {
        return this.get('questionItem.chosenItemAnswerId') === this.get('correctAnswer.id');
    }),

    feedbackText: computed('isCorrect', 'chosenAnswerText', function() {
        if(this.get('isCorrect')) {
            return this.get('i18n').t('assessment.domain.itemIsCorrect');
        }

        return `${this.get('i18n').t('assessment.domain.yourAnswerWas')} <strong>${this.get('chosenAnswerText')}</strong>.`;
    }),

    icon: computed('isCorrect', function() {
        return this.get('isCorrect') ? 'check' : 'times';
    }),

    colorClass: computed('isCorrect', function() {
        return this.get('isCorrect') ? 'text-success' : 'text-danger';
    }),

    actions: {
        onContentLinkClick(itemContent) {
            if(this.attrs.onContentLinkClick) {
                this.attrs.onContentLinkClick(itemContent);
            }
        },

        onInfoLinkClick() {
            this.toggleProperty('isExpanded');

            if(this.get('isExpanded')) {
                this.get('userEvents').logEvent('LINK_CLICK', {
                    url: `${window.location.pathname}#expand-feedback/${this.get('questionItem.id')}`,
                    title: this.get('userEvents').getPageTitle()
                });
            }
        }
    }
});
