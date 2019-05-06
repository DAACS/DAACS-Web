import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { fragment } from 'model-fragments/attributes';
import { hasMany, belongsTo } from 'ember-data/relationships';
import lowerCase from 'daacs/macros/lower-case';
import dasherized from 'daacs/macros/dasherized';


const {
    computed: { equal }
} = Ember;

export default Model.extend({
    //attributes
    assessmentCategory: attr('string'),
    assessmentType: attr('string'),
    label: attr('string'),

    //relationships
    assessmentCategoryGroup: belongsTo('assessment-category-group'),
    content: fragment('assessment-content-map'),
    domains: hasMany('assessment-domain'),
    overallRubric: fragment('assessment-rubric'),

    //computeds
    dasherizedCategory: dasherized('assessmentCategory'),
    isWritingPrompt: equal('assessmentType', 'WRITING_PROMPT'),
    lowerCaseCategory: lowerCase('assessmentCategory')
});
