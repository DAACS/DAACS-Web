import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { fragment } from 'model-fragments/attributes';
import { hasMany } from 'ember-data/relationships';
import lowerCase from 'daacs/macros/lower-case';
import dasherized from 'daacs/macros/dasherized';


const {
    computed: { equal }
} = Ember;

export default Model.extend({
    assessmentCategory: attr('string'),
    assessmentType: attr('string'),
    content: fragment('assessment-content-map'),
    domains: hasMany('assessment-domain'),
    overallRubric: fragment('assessment-rubric'),
    label: attr('string'),
    isWritingPrompt: equal('assessmentType', 'WRITING_PROMPT'),
    dasherizedCategory: dasherized('assessmentCategory'),
    lowerCaseCategory: lowerCase('assessmentCategory')
});
