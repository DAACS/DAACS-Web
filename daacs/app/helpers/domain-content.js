import Ember from 'ember';

const { isArray } = Ember;

export function domainContent(params) {
    let attr = params[0];
    let domainId = params[1];
    let domains = params[2];
    let parentDomainId = params[3];
    let parentDomain;
    let domain;
    let label = '';

    if(domainId && isArray(domains)) {
        if(parentDomainId) {
            parentDomain = domains.findBy('id', parentDomainId);

            if(!parentDomain || !isArray(parentDomain.get('subDomains'))) {
                return;
            }

            domains = parentDomain.get('subDomains');
        }

        domain = domains.findBy('id', domainId);

        if(domain) {
            label = domain.get(attr);
        }
    }

    return label;
}

export default Ember.Helper.helper(domainContent);
