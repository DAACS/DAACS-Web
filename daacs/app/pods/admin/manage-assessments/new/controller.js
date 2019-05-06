import Ember from 'ember';
import EditAssessment from 'daacs/mixins/edit-assessment';

const { get } = Ember;

export default Ember.Controller.extend(EditAssessment, {
    async save() {
        const assessment = await this._super(...arguments);
        return this.transitionToRoute('admin.manage-assessments.assessment', get(assessment, 'id'));
    }
});
