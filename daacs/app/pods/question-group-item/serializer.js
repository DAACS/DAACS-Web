import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from 'daacs/pods/application/serializer';

const {
    get,
    set,
    isNone
} = Ember;

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        chosenItemAnswer: {
            embedded: 'always'
        },
        possibleItemAnswers: {
            embedded: 'always'
        }
    },

    normalize(typeClass, hash, prop) {
        //if a question's itemContent is completely null, give it an object
        //with null question/feedback properties, so that they can be edited
        const itemContent = get(hash, 'itemContent');
        if(isNone(itemContent)) {
            set(hash, 'itemContent', {question: null, feedback: null});
        }

        return this._super(typeClass, hash, prop);
    }
});
