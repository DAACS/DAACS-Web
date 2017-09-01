import Ember from 'ember';

const {
    isArray,
    computed,
    computed: {
        alias,
        mapBy,
        sort
    },
    run: {
        next
    }
} = Ember;

export default Ember.Controller.extend({
    queryParams: ['takenDate'],
    showSubDomains: true,
    showBackToOverview: true,
    takenDate: null,
    selectedTakenDate: null,
    takenDateOptions: mapBy('takenDates', 'id'),
    canRetake: alias('latestSummary.isGraded'),
    canContinue: alias('latestSummary.isInProgress'),
    domainScoreSorting: ['rawScore'],
    sortedDomainScores: sort('model.domainScores', 'domainScoreSorting'),

    domainContent: computed('domain.domainId', 'assessmentContent.domains.[]', function() {
        return this.get('assessmentContent.domains').findBy('id', this.get('domain.domainId'));
    }),

    domainPerformanceContent: computed('domainContent.rubric.supplementTable', 'domain.rubricScore', function() {
        let table = this.get('domainContent.rubric.supplementTable');

        if(!isArray(table)) {
            return '';
        }

        let supplement = table.findBy('completionScore', this.get('domain.rubricScore'));
        return supplement ? supplement.get('content') : '';
    }),

    hasQuestions: computed('questionGroups.[]', function() {
        return isArray(this.get('questionGroups')) && this.get('questionGroups').find((group) => group.get('items.length') > 0);
    }),

    actions: {
        onTakenDateChange(takenDate) {
            //update the queryParam on the next run loop
            //otherwise ember-power-select will choke when it attempts to update
            //since this operation triggers a full transition/reload of the route
            next(this, 'set', 'takenDate',  takenDate);
        },

        onImageLinkClick(imgSrc) {
            this.send(
                'openModal',
                'assessments/question-content-modal',
                {
                    modalTitle: 'assessment.domain.viewImage',
                    modalSize: 'modal-md',
                    itemContent: {
                        itemContentType: 'IMAGE',
                        content: imgSrc
                    }
                },
                'assessments/question-content-modal'
            );
        }
    }
});
