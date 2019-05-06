import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import DataRoute from 'ember-data-route';
import Scores, { DEFAULT_SCORE_MAP } from 'daacs/constants/assessment/scores';
import GroupTransitions from 'daacs/constants/assessment/cat-group-transitions';

const {
    get,
    getProperties,
    set
} = Ember;

export default AuthenticatedRoute.extend(CheckAbilities, ScrollReset, DataRoute, {
    abilitiesRequired: ['assessments.edit'],

    titleToken() {
        return get(this, 'i18n').t('admin.createAssessment.label');
    },

    beforeModel() {
        this._super(...arguments);
        //clear existing assessments/domains from the local store before editing the assessment
        //since domains do not have globally unique IDs, so there can be naming collisions
        this.store.unloadAll('assessment');
        this.store.unloadAll('assessment-domain');
    },

    model() {
        return this.store.createRecord('assessment', {
            enabled: false,
            content: get(this, 'store').createFragment('assessment-content-map'),
            writingPrompt: get(this, 'store').createRecord('user-assessment-writing-sample'),
            itemGroupTransitions: GroupTransitions.map(t => get(this, 'store').createFragment('item-group-transition', getProperties(t, ['groupDifficulty', 'transitionMap']))),
            overallRubric: get(this, 'store').createFragment('assessment-rubric', {
                completionScoreMap: get(this, 'store').createFragment('completion-score-map', DEFAULT_SCORE_MAP),
                supplementTable: Scores.map(score => get(this, 'store').createFragment('assessment-supplement-table', {
                    completionScore: get(score, 'value')
                }))
            })
        });
    },

    resetController(controller) {
        this._super(...arguments);
        set(controller, 'submitValidationFailed', false);
    }
});
