import Ember from 'ember';
import AssessmentControllerMixin from 'daacs/mixins/assessment-controller';

export default Ember.Controller.extend(AssessmentControllerMixin, {
    disableNext: false,

    actions: {
        onNextClick() {
            return Ember.RSVP.resolve(this.transitionToRoute('assessments.take', this.get('model.lowerCaseCategory')));
        }
    }
});
