import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    assessmentId: attr('string'),
    completeDate: attr('date'),
    minWords: attr('number'),
    sample: attr('string'),
    startDate: attr('date'),
    content: attr('string')
});
