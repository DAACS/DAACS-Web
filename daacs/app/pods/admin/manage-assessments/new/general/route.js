import Ember from 'ember';
import ScrollReset from 'daacs/mixins/scroll-reset';

const {
    get,
    getProperties,
    setProperties,
    tryInvoke,
    run: { scheduleOnce }
} = Ember;

export default Ember.Route.extend(ScrollReset, {
    async afterModel() {
        const categoryGroups = await get(this, 'store').query('assessment-category-group', {});
        setProperties(this, {categoryGroups});
    },

    setupController(controller) {
        this._super(...arguments);
        setProperties(controller, getProperties(this, ['categoryGroups']));
        scheduleOnce('afterRender', this, 'showValidations');
    },

    showValidations() {
        //if the form was previously submitted on another page and validation failed
        //make sure any validation errors for fields on this page are displayed when
        //the route is entered
        const parentController = this.controllerFor('admin.manage-assessments.new');
        if(get(parentController, 'submitValidationFailed')) {
            tryInvoke(get(parentController, 'validator'), 'showAllErrors');
        }
    }
});
