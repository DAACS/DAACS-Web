import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';
import { fragmentArray } from 'model-fragments/attributes';

export default Fragment.extend({
    domainId: attr('string'),
    rawScore: attr('number'),
    rubricScore: attr('string'),
    subDomainScores: fragmentArray('assessment-domain-score')
});
