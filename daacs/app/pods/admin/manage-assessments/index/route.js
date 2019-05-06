import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import { translationMacro as t } from 'ember-i18n';

const {
    getProperties,
    setProperties,
    RSVP
} = Ember;

export default AuthenticatedRoute.extend(CheckAbilities, ScrollReset, {
    abilitiesRequired: ['admin.view'],
    titleToken: t('admin.manageAssessments'),

    model() {
        return this.store.findAll('assessment', {reload: true});
    },

    async afterModel() {
        this._super(...arguments);
        const results = await RSVP.hash({
            stats: this.store.findAll('assessment-stat-summary', {reload: true}),
            categoryGroups: this.store.query('assessment-category-group', {})
        });

        setProperties(this, results);
    },

    setupController(controller) {
        this._super(...arguments);
        setProperties(controller, getProperties(this, ['stats', 'categoryGroups']));
    }
});
