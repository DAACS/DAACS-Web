import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { fragmentArray } from 'model-fragments/attributes';
import lowerCase from 'daacs/macros/lower-case';
import dasherized from 'daacs/macros/dasherized';

const {
    isEmpty,
    computed,
    computed: {
        equal,
        mapBy
    }
} = Ember;

export default Model.extend({
    assessmentCategory: attr('string'),
    assessmentType: attr('string'),
    content: attr(),
    enabled: attr('boolean'),
    label: attr('string'),
    userHasTakenAssessment: attr('boolean'),
    userPassesPrerequisites: attr('boolean'),
    prerequisites: fragmentArray('assessment-prerequisite'),
    userAssessmentSummary: belongsTo('user-assessment-summary'),
    isWritingPrompt: equal('assessmentType', 'WRITING_PROMPT'),
    dasherizedCategory: dasherized('assessmentCategory'),
    lowerCaseCategory: lowerCase('assessmentCategory'),

    showPrerequisiteFailReasons: computed('userPassesPrerequisites', 'prerequisitesFailReasons', function() {
        return !this.get('userPassesPrerequisites') && !isEmpty(this.get('prerequisitesFailReasons'));
    }),

    prerequisitesFailReasons: mapBy('prerequisites', 'reason')
});
