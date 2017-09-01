import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'section',
    elementId: 'page-content',
    classNames: ['page-content'],
    classNameBindings: ['fullWidth:full-width:container'],
    fullWidth: false
});
