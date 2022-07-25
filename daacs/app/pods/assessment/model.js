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
import { SCORING_MANUAL, SCORING_LIGHTSIDE, SCORING_BERT } from 'daacs/constants/assessment/scoring-types';
import AssessmentTypes, { TYPE_MULTIPLE_CHOICE, TYPE_CAT, TYPE_LIKERT, TYPE_WRITING_PROMPT } from 'daacs/constants/assessment/types';

const {
    get,
    computed,
    computed: {
        alias,
        equal,
        and,
        or
    }
} = Ember;

export default Model.extend({
    //attributes
    assessmentCategory: attr('string'),
    assessmentType: attr('string'),
    createdDate: attr('date'),
    domainLabels: attr(),
    enabled: attr('boolean'),
    isValid: attr('boolean'),
    label: attr('string'),
    maxTakenGroups: attr('number'),
    minTakenGroups: attr('number'),
    numQuestionsPerGroup: attr('number'),
    scoringType: attr('string'),
    startingDifficulty: attr('string'),

    //relationships
    assessmentCategoryGroup: belongsTo('assessment-category-group'),
    content: fragment('assessment-content-map'),
    domains: hasMany('assessment-domain'),
    itemGroups: hasMany('user-assessment-question-group'),
    itemGroupTransitions: fragmentArray('item-group-transition'),
    lightSideConfig: fragment('lightside-config'),
    overallRubric: fragment('assessment-rubric'),
    prerequisites: fragmentArray('assessment-prerequisite'),
    writingPrompt: belongsTo('user-assessment-writing-sample'),

    //computeds
    createdDateFormatted: format(momentComputed('createdDate'), 'MM/DD/YYYY h:mm A'),
    dasherizedCategory: dasherized('assessmentCategory'),
    isBertScored: equal('scoringType', get(SCORING_BERT, 'value')),
    isCat: equal('assessmentType', get(TYPE_CAT, 'value')),
    isLightSideScored: equal('scoringType', get(SCORING_LIGHTSIDE, 'value')),
    isLikert: equal('assessmentType', get(TYPE_LIKERT, 'value')),
    isManuallyScored: equal('scoringType', get(SCORING_MANUAL, 'value')),
    isMultipleChoice: equal('assessmentType', get(TYPE_MULTIPLE_CHOICE, 'value')),
    isMultipleChoiceLike: or('isMultipleChoice', 'isCat'),
    isWritingPrompt: equal('assessmentType', get(TYPE_WRITING_PROMPT, 'value')),
    isWritingAutoGradingBert: and('isWritingPrompt', 'isBertScored'),
    isWritingAutoGradingLightSide: and('isWritingPrompt', 'isLightSideScored'),
    largestItemGroup: computed('itemGroups.@each.items.length', function() {
        const sortedGroups = get(this, 'itemGroups').toArray().sortBy('items.length');
        return get(sortedGroups, 'lastObject');
    }),
    lowerCaseCategory: lowerCase('assessmentCategory'),
    numUserCompletionsText: t('admin.numCompletions', {count: 'numCompletions'}),
    rowIsActive: alias('enabled'),
    typeInfo: computed('assessmentType', function() {
        return AssessmentTypes.findBy('value', get(this, 'assessmentType'));
    })
});
