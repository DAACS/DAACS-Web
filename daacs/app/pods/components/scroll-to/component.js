import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    attributeBindings: ['href'],
    href: Ember.computed.alias('target'),
    duration: 300,

    onClick: Ember.on('click', function(event) {
        let target = Ember.$(this.get('target'));
        event.preventDefault();
        Ember.$('html,body').animate({scrollTop: target.offset().top }, this.get('duration'));
    })
});
