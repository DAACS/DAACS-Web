import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    assessmentCategory: attr('string'),
    prereqType: attr('string'),
    reason: attr('string'),
    statuses: attr()
});
