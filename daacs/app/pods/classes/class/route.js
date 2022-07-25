import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import DataRoute from 'ember-data-route';

const {
    get,
    setProperties
} = Ember;

export default AuthenticatedRoute.extend(CheckAbilities, ScrollReset, DataRoute, {
    abilitiesRequired: ['classes.edit'],

    titleToken() {
        return get(this, 'i18n').t('classes.editClass.label');
    },

    model(params) {
        return this.store.findRecord('class', params.classId, {reload: true});
    },

    async afterModel() {
        const assessments = await get(this, 'store').query('assessment', { enabled: true });
        setProperties(this, {assessments});
    },

    setupController(controller) {
        this._super(...arguments);
        const assessments = this.get('assessments').toArray();
        setProperties(controller, {
            assessments
        });
    }
});
