import Ember from 'ember';
import EmberValidations from 'ember-validations';
import domainContent from 'daacs/macros/domain-content';

export default Ember.Component.extend(EmberValidations, {
    validations: {
        'domain.content': {presence: true},
        'domainContentLOW': {presence: true},
        'domainContentMEDIUM': {presence: true},
        'domainContentHIGH': {presence: true},
        'domainContentSummaryLOW': {presence: true},
        'domainContentSummaryMEDIUM': {presence: true},
        'domainContentSummaryHIGH': {presence: true}
    },

    domainContentLOW: domainContent('content', 'LOW'),
    domainContentMEDIUM: domainContent('content', 'MEDIUM'),
    domainContentHIGH: domainContent('content', 'HIGH'),
    domainContentSummaryLOW: domainContent('contentSummary', 'LOW'),
    domainContentSummaryMEDIUM: domainContent('contentSummary', 'MEDIUM'),
    domainContentSummaryHIGH: domainContent('contentSummary', 'HIGH')
});
