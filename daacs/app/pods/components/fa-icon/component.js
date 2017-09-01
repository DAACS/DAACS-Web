import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'i',
    attributeBindings: ['aria-hidden'],
    classNames: ['fa'],
    classNameBindings: [
        'iconCls',
        'sizeCls',      //lg|2x|3x|4x|5x
        'rotateCls',    //90|180|2670
        'flipVertical:fa-flip-vertical',
        'flipHorizontal:fa-flip-horizontal',
        'fixedWidth:fa-fw',
        'spin:fa-spin',
        'pulse:fa-pulse',
        'listItem:fa-li'
    ],

    'aria-hidden': true,

    iconCls: Ember.computed('icon', function() {
        return `fa-${this.get('icon')}`;
    }),

    sizeCls: Ember.computed('size', function() {
        const iconSize = this.get('size');
        return !Ember.isEmpty(iconSize) ? `fa-${iconSize}` : null;
    }),

    rotateCls: Ember.computed('rotate', function() {
        const rotate = this.get('rotate');
        return !Ember.isEmpty(rotate) ? `fa-rotate-${rotate}` : null;
    })
});
