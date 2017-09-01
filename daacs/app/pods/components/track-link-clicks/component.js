import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['track-link-clicks'],
    userEvents: Ember.inject.service('user-events'),

    click(event) {
        const target = Ember.$(event.target);

        if(target.is('a') && !Ember.isEmpty(target.attr('href'))) {
            this.get('userEvents').logEvent('LINK_CLICK', {
                url: target.attr('href'),
                title: target.text()
            });
        }
    }
});
