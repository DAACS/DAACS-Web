import Ember from 'ember';
import ApplicationSerializer from 'daacs/mirage/serializers/application';

export default ApplicationSerializer.extend({
    keyForAttribute(attr) {
        return Ember.String.underscore(attr);
    }
});
