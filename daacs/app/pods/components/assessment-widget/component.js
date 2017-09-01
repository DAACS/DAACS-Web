import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['assessment-widget'],
    hasScore: Ember.computed.notEmpty('score')
});
