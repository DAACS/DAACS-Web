import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
    take: Ember.computed.alias('session.user.isStudent'),
    selectUser: Ember.computed.or('session.user.isAdvisor', 'session.user.isAdmin'),
    import: Ember.computed.alias('session.user.isAdmin'),
    edit: Ember.computed.alias('session.user.isAdmin')
});
