import Ember from 'ember';
import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';
import { fragment } from 'model-fragments/attributes';

const {
    computed: { equal }
} = Ember;

export default Model.extend({
    content: attr('string'),
    domainType: attr('string'),
    label: attr('string'),
    rubric: fragment('assessment-rubric'),
    scoreIsSubDomainAverage: attr('boolean'),
    subDomains: hasMany('assessment-domain', {inverse: null}),
    isAnalysisDomain: equal('domainType', 'ANALYSIS')
});
