import Ember from 'ember';
import { Ability } from 'ember-can';

const {
    computed: { alias, or }
} = Ember;

export default Ability.extend({
    view: or('session.user.isAdmin', 'session.user.isInstructor'),
    create: or('session.user.isAdmin', 'session.user.isInstructor'),
    edit: or('session.user.isAdmin', 'session.user.isInstructor'),
    import: alias('session.user.isAdmin'),
    search: alias('session.user.isAdmin'),
    forceAccept: alias('session.user.isAdmin')
});
