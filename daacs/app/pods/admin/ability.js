import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
    view: Ember.computed.alias('session.user.isAdmin'),
    grade: Ember.computed.alias('session.user.isAdmin')
});
