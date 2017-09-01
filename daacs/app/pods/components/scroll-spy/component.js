import Ember from 'ember';

export default Ember.Component.extend({
    scrollOffset: 20,
    spiedElement: 'body',

    onInsertElement: Ember.on('didInsertElement', function() {
        Ember.$(this.get('spiedElement')).scrollspy({
            target: `#${this.get('elementId')}`,
            offset: this.get('scrollOffset')
        });
    }),

    onDestroyElement: Ember.on('willDestroyElement', function() {
        Ember.$(window).off('.scrollspy');
        Ember.$('body').removeData('bs.scrollspy');
    })
});
