import Ember from 'ember';
import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';
import { fragmentArray } from 'model-fragments/attributes';
import moment from 'moment';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import lowerCase from 'daacs/macros/lower-case';
import dasherized from 'daacs/macros/dasherized';

const {
    computed,
    computed: {
        equal,
        or
    }
} = Ember;

export default Model.extend({
    assessmentCategory: attr('string'),
    assessmentId: attr('string'),
    assessmentLabel: attr('string'),
    assessmentType: attr('string'),
    completionDate: attr('date'),
    domainScores: fragmentArray('assessment-domain-score'),
    firstName: attr('string'),
    lastName: attr('string'),
    overallScore: attr('string'),
    progressPercentage: attr('number'),
    status: attr('string'),
    takenDate: attr('date'),
    userId: attr('string'),
    username: attr('string'),
    writingPrompt: belongsTo('user-assessment-writing-sample'),
    isWritingPrompt: equal('assessmentType', 'WRITING_PROMPT'),
    isInProgress: equal('status', 'IN_PROGRESS'),
    isCompleted: equal('status', 'COMPLETED'),
    isGraded: equal('status', 'GRADED'),
    isGradingFailed: equal('status', 'GRADING_FAILURE'),
    isFinished: or('isCompleted', 'isGraded', 'isGradingFailed'),
    completionDateFormatted: format(momentComputed('completionDate'), 'MM/DD/YYYY h:mm A'),
    takenDateISO: computed('takenDate', function() {
        return moment(this.get('takenDate')).toISOString();
    }),
    dasherizedCategory: dasherized('assessmentCategory'),
    lowerCaseCategory: lowerCase('assessmentCategory'),
    userFullName: computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`.trim();
    })
});
