import Ember from 'ember';

const {
    inject: {
        controller
    }
} = Ember;

export default Ember.Controller.extend({
    parentController: controller('admin/manage-assessments/new')
});
