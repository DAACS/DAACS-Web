import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { fragment, fragmentArray } from 'model-fragments/attributes';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { translationMacro as t } from 'ember-i18n';
import lowerCase from 'daacs/macros/lower-case';
import dasherized from 'daacs/macros/dasherized';

const {
    computed: {
        alias,
        equal
    }
} = Ember;

export default Model.extend({
    assessmentCategory: attr('string'),
    assessmentType: attr('string'),
    content: fragment('assessment-content-map'),
    createdDate: attr('date'),
    domains: hasMany('assessment-domain'),
    domainLabels: attr(),
    enabled: attr('boolean'),
    itemGroupTransitions: attr(),
    itemGroups: hasMany('user-assessment-question-group'),
    label: attr('string'),
    lightSideConfig: fragment('lightside-config'),
    maxTakenGroups: attr('number'),
    minTakenGroups: attr('number'),
    numQuestionsPerGroup: attr('number'),
    prerequisites: fragmentArray('assessment-prerequisite'),
    overallRubric: fragment('assessment-rubric'),
    scoringType: attr('string'),
    startingDifficulty: attr('string'),
    writingPrompt: belongsTo('user-assessment-writing-sample'),
    numUserCompletionsText: t('admin.numCompletions', {count: 'numCompletions'}),
    isMultipleChoice: equal('assessmentType', 'CAT'),
    isLikert: equal('assessmentType', 'LIKERT'),
    isWritingPrompt: equal('assessmentType', 'WRITING_PROMPT'),
    isManuallyScored: equal('scoringType', 'MANUAL'),
    rowIsActive: alias('enabled'),
    createdDateFormatted: format(momentComputed('createdDate'), 'MM/DD/YYYY h:mm A'),
    dasherizedCategory: dasherized('assessmentCategory'),
    lowerCaseCategory: lowerCase('assessmentCategory')
});
