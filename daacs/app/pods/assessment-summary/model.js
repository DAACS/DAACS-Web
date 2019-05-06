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
    //attributes
    assessmentCategory: attr('string'),
    assessmentType: attr('string'),
    content: attr(),
    enabled: attr('boolean'),
    label: attr('string'),
    userHasTakenAssessment: attr('boolean'),
    userPassesPrerequisites: attr('boolean'),

    //relationships
    assessmentCategoryGroup: belongsTo('assessment-category-group'),
    prerequisites: fragmentArray('assessment-prerequisite'),
    userAssessmentSummary: belongsTo('user-assessment-summary'),

    //computeds
    dasherizedCategory: dasherized('assessmentCategory'),
    isWritingPrompt: equal('assessmentType', 'WRITING_PROMPT'),
    lowerCaseCategory: lowerCase('assessmentCategory'),
    prerequisitesFailReasons: mapBy('prerequisites', 'reason'),
    showPrerequisiteFailReasons: computed('userPassesPrerequisites', 'prerequisitesFailReasons', function() {
        return !this.get('userPassesPrerequisites') && !isEmpty(this.get('prerequisitesFailReasons'));
    })
});
