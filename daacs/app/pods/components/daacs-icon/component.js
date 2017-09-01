import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'span',
    attributeBindings: ['aria-hidden'],
    classNames: ['daacs-icon'],
    classNameBindings: ['iconCls', 'sizeCls'],
    'aria-hidden': true,

    iconCls: Ember.computed('icon', function() {
        return `daacs-icon-${this.get('icon')}`;
    }),

    sizeCls: Ember.computed('size', function() {
        const iconSize = this.get('size');
        return !Ember.isEmpty(iconSize) ? `daacs-icon-${iconSize}` : null;
    })
});
