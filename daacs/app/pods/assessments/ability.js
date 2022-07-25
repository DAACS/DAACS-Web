import Ember from 'ember';
import { Ability } from 'ember-can';

const {
    computed: {
        or,
        alias
    }
} = Ember;

export default Ability.extend({
    take: alias('session.user.isStudent'),
    selectUser: or('session.user.isInstructor', 'session.user.isAdvisor', 'session.user.isAdmin'),
    import: alias('session.user.isAdmin'),
    create: alias('session.user.isAdmin'),
    edit: alias('session.user.isAdmin')
});
