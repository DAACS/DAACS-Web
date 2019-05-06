import Ember from 'ember';
import Scores from 'daacs/constants/assessment/scores';

const {
    get,
    set,
    tryInvoke
} = Ember;

export default Ember.Component.extend({
    scores: Scores,
    numBaseCols: 3,

    actions: {
        openDomainDetails(domain, parentDomain) {
            return tryInvoke(this.attrs, 'openEditDomain', [domain, parentDomain]);
        },

        addDomain() {
            return tryInvoke(this.attrs, 'openAddDomain');
        },

        removeDomain(domain) {
            get(this, 'model.domains').removeObject(domain);
            return domain.deleteRecord();
        },

        removeSubDomain(domain, subDomain) {
            get(domain, 'subDomains').removeObject(subDomain);
            return subDomain.deleteRecord();
        },

        reorderDomains(domains) {
            set(this, 'model.domains', domains);
        },

        reorderSubDomains(domain, subDomains) {
            set(domain, 'subDomains', subDomains);
        }
    }
});
