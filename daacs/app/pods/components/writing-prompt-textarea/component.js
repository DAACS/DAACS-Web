import Ember from 'ember';

export default Ember.TextArea.extend({
    attributeBindings: [
        'style',
        'aria-labelledby'
    ]
});
