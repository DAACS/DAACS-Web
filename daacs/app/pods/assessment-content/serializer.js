import DS from 'ember-data';
import Serializer from 'daacs/pods/application/serializer';

export default Serializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'assessmentId',
    attrs: {
        assessmentCategoryGroup: {
            embedded: 'always'
        },
        domains: {
            embedded: 'always'
        }
    }
});
