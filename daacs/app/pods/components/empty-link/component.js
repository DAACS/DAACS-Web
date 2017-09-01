import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    attributeBindings: ['href', 'role'],
    href: '',
    role: 'presentation',

    onClick: Ember.on('click', function(event) {
        event.preventDefault();
    })
});
