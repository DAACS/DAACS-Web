import Ember from 'ember';
import PageLayout from 'daacs/mixins/page-layout';
import AssessmentContentRoute from 'daacs/mixins/assessment-content-route';

export default Ember.Mixin.create(PageLayout, AssessmentContentRoute, {
    headerTemplate: 'assessments/take/header',
    footerTemplate: 'assessments/take/footer'
});
