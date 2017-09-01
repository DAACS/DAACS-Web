import Ember from 'ember';
import FormValidator from 'daacs/pods/components/form-validator/component';

export default FormValidator.extend({
    tagName: 'div',

    init() {
        this._super(...arguments);
        this.get('parent').registerChild(this);
    },

    onWillDestroyElement: Ember.on('willDestroyElement', function() {
        this.get('parent').deregisterChild(this);
    })
});
