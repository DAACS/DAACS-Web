import Ember from 'ember';
import { USABLE_CONTENT_TYPES, CONTENT_TYPE_WORD } from 'daacs/constants/assessment/content-types';

const {
    get,
    set,
    setProperties,
    isEmpty,
    computed: { notEmpty },
    inject: { service }
} = Ember;

export default Ember.Component.extend({
    store: service(),
    contentTypes: USABLE_CONTENT_TYPES,
    allowFullscreen: false,
    hasContent: notEmpty('model'),

    actions: {
        updateContentType(newType) {
            if(isEmpty(newType)) {
                set(this, 'model', null);
                return;
            }

            let model = get(this, 'model');
            let modelProps = {itemContentType: newType, content: ''};
            if(isEmpty(model)) {
                model = get(this, 'store').createFragment('item-content-block', modelProps);
                set(this, 'model', model);
            } else {
                setProperties(model, modelProps);
            }
        },

        toggleWordContent() {
            let model = get(this, 'model');
            if(isEmpty(model)) {
                model = get(this, 'store').createFragment('item-content-block', {
                    itemContentType: get(CONTENT_TYPE_WORD, 'value'),
                    content: ''
                });
                set(this, 'model', model);
            } else {
                set(this, 'model', null);
            }
        }
    }
});
