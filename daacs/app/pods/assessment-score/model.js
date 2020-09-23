import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    assessmentId: attr('string'),
    assessmentCategoryGroup: attr('string'),
    overallScore: attr('string')
});
