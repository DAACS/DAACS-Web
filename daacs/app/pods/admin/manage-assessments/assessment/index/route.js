import Ember from 'ember';

export default Ember.Route.extend({
    redirect() {
        this.transitionTo('admin.manage-assessments.assessment.general');
     }
});
