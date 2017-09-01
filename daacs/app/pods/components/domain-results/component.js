import Ember from 'ember';

const {
    isEmpty,
    isArray,
    computed
} = Ember;

export default Ember.Component.extend({
    tagName: 'section',
    classNames: ['domain-results'],

    feedbackContent: computed('domainScore', 'parentDomainScore', 'domains.[]', function() {
        let parentDomainId = this.get('parentDomainScore.domainId');
        let domainId = this.get('domainScore.domainId');
        let score = this.get('domainScore.rubricScore');
        let domains = this.get('domains');

        if(!isArray(domains) || isEmpty(domains)) {
            return '';
        }

        if(!isEmpty(parentDomainId)) {
            let parentDomain = domains.findBy('id', parentDomainId);

            if(!parentDomain || !isArray(parentDomain.get('subDomains'))) {
                return '';
            }

            domains = parentDomain.get('subDomains');
        }

        let domain = domains.findBy('id', domainId);

        if(!domain || !isArray(domain.get('rubric.supplementTable'))) {
            return '';
        }

        let supplement = domain.get('rubric.supplementTable').findBy('completionScore', score);

        return supplement ? supplement.get('contentSummary') : '';
    })
});
