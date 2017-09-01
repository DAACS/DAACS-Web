import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    completeDate: attr('date'),
    content: attr('string'),
    minWords: attr('number'),
    sample: attr('string'),
    startDate: attr('date')
});
