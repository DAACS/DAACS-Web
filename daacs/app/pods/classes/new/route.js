import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import DataRoute from 'ember-data-route';

const {
    get,
    getProperties,
    setProperties
} = Ember;

export default AuthenticatedRoute.extend(CheckAbilities, ScrollReset, DataRoute, {
    abilitiesRequired: ['classes.create'],

    titleToken() {
        return get(this, 'i18n').t('classes.createClass.label');
    },

    model() {
        return this.store.createRecord('class', {
            assessmentIds: [],
            instructorId: this.session.user.id
        });
    },

    async afterModel() {
        const assessments = await get(this, 'store').query('assessment', {});
        setProperties(this, {assessments});
    },

    setupController(controller) {
        this._super(...arguments);
        setProperties(controller, getProperties(this, ['assessments']));
    },

    resetController(controller) {
        this._super(...arguments);
        setProperties(controller, {
            submitValidationFailed: false
        });
    }
});
