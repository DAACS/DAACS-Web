import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';
import { array as arrayAttr } from 'model-fragments/attributes';

export default Fragment.extend({
    assessmentCategory: attr('string'),
    prereqType: attr('string'),
    reason: attr('string'),
    statuses: arrayAttr('string')
});
