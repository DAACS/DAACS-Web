import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['collapsible-accordion'],
    attributeBindings: ['role', 'aria-multiselectable'],
    role: 'tablist',
    'aria-multiselectable': true,

    parentSelector: Ember.computed('elementId', function() {
        return `#${this.get('elementId')}`;
    })
});
