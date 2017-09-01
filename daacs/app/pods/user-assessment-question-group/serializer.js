import DS from 'ember-data';
import ApplicationSerializer from 'daacs/pods/application/serializer';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        items: {
            embedded: 'always'
        }
    }
});
