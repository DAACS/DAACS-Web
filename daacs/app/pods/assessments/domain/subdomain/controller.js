import Ember from 'ember';
import DomainController from 'daacs/pods/assessments/domain/index/controller';

const { computed } = Ember;

export default DomainController.extend({
    parentDomainContent: computed('parentDomain.domainId', 'assessmentContent.domains.[]', function() {
        return this.get('assessmentContent.domains').findBy('id', this.get('parentDomain.domainId'));
    }),

    domainContent: computed('domain.domainId', 'parentDomainContent.subDomains.[]', function() {
        return this.get('parentDomainContent.subDomains').findBy('id', this.get('domain.domainId'));
    })
});
