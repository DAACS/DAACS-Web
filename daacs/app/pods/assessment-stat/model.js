import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    completionStatus: attr('string'),
    count: attr('number')
});
