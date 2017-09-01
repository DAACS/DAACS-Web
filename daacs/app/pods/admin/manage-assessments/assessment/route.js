import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import DataRoute from 'ember-data-route';

export default AuthenticatedRoute.extend(CheckAbilities, ScrollReset, DataRoute, {
    abilitiesRequired: ['admin.view'],
    titleToken(model) {
        return `${this.get('i18n').t('admin.assessmentDetails.label')}: ${model.get('label')}`;
    },

    model(params) {
        return this.store.findRecord('assessment', params.assessment_id, {reload: true});
    },

    setupController(controller, model) {
        this._super(...arguments);
        controller.set('selectedScoringType', model.get('scoringType'));
    },

    resetController(controller, isExiting) {
        if(isExiting) {
            controller.set('serverErrors', null);
            controller.set('modelFiles', {});
        }
    },

    actions: {
        refreshRoute() {
            this.refresh();
        }
    }
});
