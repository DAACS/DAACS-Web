import Ember from 'ember';
import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';
import { fragment } from 'model-fragments/attributes';
import DomainTypes, { DOMAIN_TYPE_ANALYSIS } from 'daacs/constants/assessment/domain-types';

const {
    get,
    computed,
    computed: {
        equal,
        notEmpty
    }
} = Ember;

export default Model.extend({
    bertModelFilename: attr('string'),
    content: attr('string'),
    domainType: attr('string'),
    label: attr('string'),
    lightsideModelFilename: attr('string'),
    rubric: fragment('assessment-rubric'),
    scoreIsSubDomainAverage: attr('boolean'),
    subDomains: hasMany('assessment-domain', {inverse: null}),
    hasSubDomains: notEmpty('subDomains'),
    isAnalysisDomain: equal('domainType', get(DOMAIN_TYPE_ANALYSIS, 'value')),
    domainTypeInfo: computed('domainType', function() {
        return DomainTypes.findBy('value', get(this, 'domainType'));
    })
});
