import attr from 'ember-data/attr';
import Model from 'ember-data/model';

export default Model.extend({
    content: attr('string'),
    score: attr('number')
});
