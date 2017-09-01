import Ember from 'ember';
import { trim } from 'daacs/helpers/trim';

export default Ember.Component.extend({
    classNames: ['question-writing-prompt'],
    questionText: Ember.computed.alias('writingSample.content'),
    response: Ember.computed.alias('writingSample.sample'),
    minWords: Ember.computed.alias('writingSample.minWords'),
    minWordsReqMet: Ember.computed.equal('numReqWordsRemaining', 0),
    isSaving: false,
    hasSaved: false,
    saveDelay: 500,

    userHasEnteredData: Ember.computed('response', 'hasSaved', function() {
        //only report the user as having entered unsaved data if their
        //current response has not been auto-saved
        return !Ember.isBlank(this.get('response')) && !this.get('hasSaved');
    }),

    saveText: Ember.computed('isSaving', 'hasSaved', function() {
        if(this.get('isSaving')) {
            return this.get('i18n').t('assessment.writingPrompt.savingChanges');
        } else if(this.get('hasSaved')) {
            return this.get('i18n').t('assessment.writingPrompt.changesSaved');
        }
    }),

    numWords: Ember.computed('response', function() {
        let str = this.get('response'),
            numWords = 0;

        if(!Ember.isBlank(str)) {
            //exclude start and end white-space
            str = trim(str);
            //2 or more space to 1
            str = str.replace(/[ ]{2,}/gi, " ");
            // exclude newline with a start spacing
            str = str.replace(/\n /,"\n");
            numWords = str.split(' ').length;
        }

        return numWords;
    }),

    numReqWordsRemaining: Ember.computed('minWords', 'numWords', function() {
        const minWords = this.get('minWords');
        const numWords = this.get('numWords');
        return Ember.isEmpty(minWords) ? 0 : Math.max(0, minWords - numWords);
    }),

    textAreaStyle: Ember.computed('textAreaHeight', function() {
        let h = this.get('textAreaHeight');
        return h ? `height:${h}px;` : null;
    }),

    setTextAreaHeight() {
        //calculate the available vertical space that the textarea can take up
        let container = this.$().closest('.assessment-question-container'),
            questionText = Ember.$('.question:first', container),
            promptFooter = Ember.$('.writing-prompt-footer:first', container),
            containerH = container.height(),
            questionTextH = questionText.outerHeight(true),
            promptFooterH = promptFooter.outerHeight(true),
            bufferSpace = 20;

        this.set('textAreaHeight', containerH - questionTextH - promptFooterH - bufferSpace);
    },

    onInsertElement: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', this, 'setTextAreaHeight');
    }),

    onInit: Ember.on('init', function() {
        if(!Ember.isBlank(this.get('response')) && this.attrs.onAnswerChange) {
            //if prepopulated with a auto-saved response, report to the parent controller
            //that the answer has changed, so that the UI can be updated as needed
            this.attrs.onAnswerChange(this.get('writingSample'), false, this.get('minWordsReqMet'));
        }
    }),

    async saveProgress() {
        this.set('isSaving', true);

        try {
            let saveResult = await this.get('writingSample').save();

            this.setProperties({
                isSaving: false,
                hasSaved: true
            });

            if(this.attrs.onAnswerChange) {
                //notify the parent controller that the entered data was saved
                //so that the user doesn't get an "unsaved changes" confirmation modal
                this.attrs.onAnswerChange(
                    this.get('writingSample'),
                    this.get('userHasEnteredData'),
                    this.get('minWordsReqMet')
                );
            }

            return saveResult;
        } catch(error) {
            this.setProperties({
                isSaving: false,
                hasSaved: false
            });

            return Ember.RSVP.reject(error);
        }
    },

    onResponseChange: Ember.observer('response', function() {
        //save the entered text whenever the user pauses typing
        this.set('hasSaved', false);
        Ember.run.debounce(this, 'saveProgress', this.get('saveDelay'));
    }),

    onMinWordsReqMetChange: Ember.observer('minWordsReqMet', function() {
        //let the assessments/take controller know if the question is valid to submit or not
        if(this.attrs.onAnswerChange) {
            this.attrs.onAnswerChange(
                this.get('writingSample'),
                this.get('userHasEnteredData'),
                this.get('minWordsReqMet')
            );
        }
    })
});
