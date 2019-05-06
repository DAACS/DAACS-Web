import Ember from 'ember';

const {
    get,
    tryInvoke
} = Ember;

export default Ember.Component.extend({
    classNames: ['row'],
    showEditor: false,

    actions: {
        toggleEditor() {
            this.toggleProperty('showEditor');
        },

        remove() {
            return tryInvoke(this.attrs, 'removeAnswer', [get(this, 'answer')]);
        }
    }
});
