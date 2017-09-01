import Ember from 'ember';

const {
    computed,
    computed: {
        alias,
        mapBy,
        sort
    }
} = Ember;

export default Ember.Controller.extend({
    queryParams: ['finished', 'takenDate'],
    finished: false,
    takenDate: null,
    selectedTakenDate: null,
    takenDateOptions: mapBy('takenDates', 'id'),
    domainScoreSorting: ['rawScore'],
    sortedDomainScores: sort('model.domainScores', 'domainScoreSorting'),
    canRetake: alias('latestSummary.isGraded'),
    canContinue: alias('latestSummary.isInProgress'),
    overallAssessmentFeedback: computed(
        'model.overallScore',
        'assessmentContent.overallRubric.supplementTable.[]',
        function() {
            let table = this.get('assessmentContent.overallRubric.supplementTable'),
                supplement = table.findBy('completionScore', this.get('model.overallScore'));

            return supplement ? supplement.get('content') : '';
        }
    ),

    emptyText: computed('model.{isCompleted,isInProgress,isGradingFailed,isWritingPrompt}', 'finished', function() {
        let text = 'assessment.neverTaken';

        if(this.get('model.isCompleted') || this.get('model.isGradingFailed') || this.get('finished')) {
            text = this.get('model.isWritingPrompt') ? 'assessment.notYetGradedWriting' : 'assessment.notYetGraded';
        } else if(this.get('model.isInProgress')) {
            text = 'assessment.isInProgress';
        }

        return this.get('i18n').t(text);
    }),

    actions: {
        onTakenDateChange(takenDate) {
            //update the queryParam on the next run loop
            //otherwise ember-power-select will choke when it attempts to update
            //since this operation triggers a full transition/reload of the route
            Ember.run.next(this, 'set', 'takenDate',  takenDate);
        }
    }
});
