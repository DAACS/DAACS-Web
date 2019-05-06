import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { fragmentArray } from 'model-fragments/attributes';
import moment from 'moment';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import lowerCase from 'daacs/macros/lower-case';
import dasherized from 'daacs/macros/dasherized';
import { TYPE_MULTIPLE_CHOICE, TYPE_CAT, TYPE_LIKERT, TYPE_WRITING_PROMPT } from 'daacs/constants/assessment/types';

const {
    get,
    computed,
    computed: {
        or,
        equal
    },
    String: {
        htmlSafe
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
    scoringType: attr('string'),
    status: attr('string'),
    takenDate: attr('date'),
    userId: attr('string'),
    username: attr('string'),
    isMultipleChoice: equal('assessmentType', get(TYPE_MULTIPLE_CHOICE, 'value')),
    isCat: equal('assessmentType', get(TYPE_CAT, 'value')),
    isLikert: equal('assessmentType', get(TYPE_LIKERT, 'value')),
    isWritingPrompt: equal('assessmentType', get(TYPE_WRITING_PROMPT, 'value')),
    isMultipleChoiceLike: or('isMultipleChoice', 'isCat'),
    isInProgress: equal('status', 'IN_PROGRESS'),
    isCompleted: equal('status', 'COMPLETED'),
    isGraded: equal('status', 'GRADED'),
    isGradingFailed: equal('status', 'GRADING_FAILURE'),
    isFinished: or('isCompleted', 'isGraded', 'isGradingFailed'),
    takenDateISO: computed('takenDate', function() {
        return moment(this.get('takenDate')).toISOString();
    }),
    dasherizedCategory: dasherized('assessmentCategory'),
    lowerCaseCategory: lowerCase('assessmentCategory'),
    completionDateFormatted: format(momentComputed('completionDate'), 'MM/DD/YYYY h:mm A'),
    isManuallyScored: equal('scoringType', 'MANUAL'),
    scoringTypeLabel: computed('isManuallyScored', function() {
        return this.get('i18n').t(this.get('isManuallyScored') ? 'admin.scoring.manual' : 'admin.scoring.automatic');
    }),
    fullName: computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`.trim();
    }),
    fullNameWithUsername: computed('fullName', 'username', function() {
        return htmlSafe(`${this.get('fullName')} <small class="text-muted">(${this.get('username')})</span>`);
    })
});
