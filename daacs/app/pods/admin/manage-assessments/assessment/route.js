import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import DataRoute from 'ember-data-route';

const {
    set
} = Ember;

export default AuthenticatedRoute.extend(CheckAbilities, ScrollReset, DataRoute, {
    abilitiesRequired: ['assessments.edit'],

    titleToken(model) {
        return `${this.get('i18n').t('admin.assessmentDetails.label')}: ${model.get('label')}`;
    },

    async beforeModel() {
        this._super(...arguments);
        //clear existing assessments/domains from the local store before editing the assessment
        //since domains do not have globally unique IDs, so there can be naming collisions
        this.store.unloadAll('assessment');
        this.store.unloadAll('assessment-domain');
    },

    model(params) {
        return this.store.findRecord('assessment', params.assessment_id, {reload: true});
    },

    resetController(controller) {
        this._super(...arguments)
        set(controller, 'submitValidationFailed', false);
    }
});
