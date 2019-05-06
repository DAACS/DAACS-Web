import Ember from 'ember';
import AssessmentDomainsController from 'daacs/pods/admin/manage-assessments/assessment/domains/controller';

const {
    inject: {
        controller
    }
} = Ember;

export default AssessmentDomainsController.extend({
    parentController: controller('admin/manage-assessments/new')
});
