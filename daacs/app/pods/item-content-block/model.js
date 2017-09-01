import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    content: attr('string'),
    itemContentType: attr('string')
});
