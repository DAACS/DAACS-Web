import Ember from 'ember';
import AssessmentQuestionsController from 'daacs/pods/admin/manage-assessments/assessment/questions/controller';

const {
    inject: {
        controller
    }
} = Ember;

export default AssessmentQuestionsController.extend({
    parentController: controller('admin/manage-assessments/new')
});
