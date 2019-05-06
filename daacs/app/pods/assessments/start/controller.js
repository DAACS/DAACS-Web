import Ember from 'ember';
import AssessmentControllerMixin from 'daacs/mixins/assessment-controller';

const {
    get,
    RSVP
} = Ember;

export default Ember.Controller.extend(AssessmentControllerMixin, {
    disableNext: false,

    actions: {
        onNextClick() {
            return RSVP.resolve(this.transitionToRoute('assessments.take', get(this, 'assessmentContent.assessmentCategoryGroup.id')));
        }
    }
});
