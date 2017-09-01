import DS from 'ember-data';
import Ember from 'ember';

export default DS.StringTransform.extend({
    serialize() {
        let serialized = this._super(...arguments);

        //backend does not allow null values for assessment feedback content
        if(Ember.isNone(serialized)) {
            serialized = '';
        }

        return serialized;
    }
});
