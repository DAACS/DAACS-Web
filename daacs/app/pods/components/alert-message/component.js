import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['alert-message', 'alert'],
    classNameBindings: ['alertType'],
    attributeBindings: ['role'],
    //info|warning|success|danger
    type: 'info',
    role: 'alert',
    closeable: true,
    text: null,
    title: null,
    alertType: Ember.computed('type', function() {
        return `alert-${this.get('type')}`;
    })
});
