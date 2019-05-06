import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import dasherized from 'daacs/macros/dasherized';
import AssessmentCategories from 'daacs/constants/assessment/categories';

const {
    get,
    computed
} = Ember;

export default DS.Model.extend({
    //attributes
    assessmentCategory: attr('string'),
    label: attr('string'),
    samlField: attr('string'),
    samlValue: attr('string'),

    //computeds
    categoryInfo: computed('assessmentCategory', function() {
        return AssessmentCategories.findBy('value', get(this, 'assessmentCategory'));
    }),
    dasherizedCategory: dasherized('assessmentCategory')
});
