import DS from 'ember-data';
import ApplicationSerializer from 'daacs/pods/application/serializer';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'assessmentCategoryGroupId',
    attrs: {
        enabledAssessmentSummary: {
            embedded: 'always'
        },
        latestUserAssessmentSummary: {
            embedded: 'always'
        }
    }
});
