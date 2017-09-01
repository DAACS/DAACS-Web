import Ember from 'ember';

export default Ember.Mixin.create({
    async beforeModel(transition) {
        this._super(...arguments);
        let query = { assessmentCategory: transition.params.assessments.assessment_category.toUpperCase() };

        if(transition.queryParams.takenDate) {
            query.takenDate = transition.queryParams.takenDate;
        }

        let assessmentContent = await this.store.queryRecord('assessment-content', query);
        this.set('assessmentContent', assessmentContent);
        return assessmentContent;
    },

    setupController(controller) {
        this._super(...arguments);
        controller.set('assessmentContent', this.get('assessmentContent'));
    }
});
