import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['tab-list'],
    attributeBindings: ['role', 'aria-multiselectable'],
    role: 'tablist',
    'aria-multiselectable': false
});
