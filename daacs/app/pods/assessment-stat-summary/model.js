import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { fragmentArray } from 'model-fragments/attributes';

export default Model.extend({
    assessmentCategory: attr('string'),
    stat: fragmentArray('assessment-stat'),
    total: attr('number')
});
