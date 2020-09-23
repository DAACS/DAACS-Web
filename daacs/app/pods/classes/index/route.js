import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import Pagination from 'daacs/mixins/route-pagination';
import { translationMacro as t } from 'ember-i18n';
const {
    setProperties,
    RSVP
} = Ember;

export default AuthenticatedRoute.extend(CheckAbilities, Pagination, {
    abilitiesRequired: ['classes.view'],
    titleToken: t('classes.label'),

    queryParams: {
        classId: { refreshModel: true }
    },

    model(params) {
        const classId = params.classId;
        if(!classId) {
            return [];
        }
        return this.store.query('class-score', params);
    },

    async afterModel() {
        this._super(...arguments);
        const controller = this.controllerFor('classes.index');
        const instructorId = controller.get('instructorId') ? controller.get('instructorId') : this.get('session.user.id');
        const results = await RSVP.hash({
            classes: this.store.query('class', { instructorId: [instructorId] })
        });

        setProperties(this, results);
    },

    setupController(controller) {
        this._super(...arguments);
        const classes = this.get('classes').toArray();
        const classId = classes.length ? (controller.classId ? controller.classId : classes.get('firstObject.id')) : null;
        setProperties(controller, {
            classes,
            classId
        });
    }
});
