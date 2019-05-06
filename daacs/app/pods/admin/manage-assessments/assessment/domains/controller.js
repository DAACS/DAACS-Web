import Ember from 'ember';
import AssessmentGeneralController from 'daacs/pods/admin/manage-assessments/assessment/general/controller';
import { DOMAIN_TYPE_SCORING } from 'daacs/constants/assessment/domain-types';
import Scores, { DEFAULT_SCORE_MAP } from 'daacs/constants/assessment/scores';

const {
    get
} = Ember;

export default AssessmentGeneralController.extend({
    openDomainModal(domain, parentDomain = null, isNew = false) {
        const path = 'admin/manage-assessments/domain-modal';
        this.send('openModal', path, domain, path, [get(this, 'model'), parentDomain, isNew]);
    },

    actions: {
        openAddDomain() {
            const scoreMap = get(this, 'model.isWritingPrompt') ?
                 {} :
                 get(this, 'store').createFragment('completion-score-map', DEFAULT_SCORE_MAP);

            const model = get(this, 'store').createRecord('assessment-domain', {
                domainType: get(DOMAIN_TYPE_SCORING, 'value'),
                rubric: get(this, 'store').createFragment('assessment-rubric', {
                    completionScoreMap: scoreMap,
                    supplementTable: Scores.map(score => get(this, 'store').createFragment('assessment-supplement-table', {
                        completionScore: get(score, 'value')
                    }))
                })
            });

            return this.openDomainModal(model, null, true);
        },

        openEditDomain(domain, parentDomain) {
            return this.openDomainModal(domain, parentDomain);
        }
    }
});
