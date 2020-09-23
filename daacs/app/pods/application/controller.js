import Ember from 'ember';
import Config from 'daacs/config/environment';

const {
    computed,
    computed: { alias }
} = Ember;

export default Ember.Controller.extend({
    advisor: Ember.inject.service(),
    queryParams: ['token', 'userId', 'username'],
    token: null,
    userId: null,
    username: null,
    selectedUser: alias('advisor.selectedUser'),

    currentPathClasses: computed('currentPath', function() {
        //doing this to get CSS classes similar to what ember-body-class provides, but w/full fastboot compatibility
        //ember-body-class currently does not apply classes in fastboot/server-side, so dependent CSS styles
        //are not applied until after the client-side app loads, resulting in a flash of different styles
        //@see https://github.com/AddJam/ember-body-class/issues/6
        return this.get('currentPath').split('.').join(' ');
    }),

    userConsent: computed('session.user.hasDataUsageConsent', function() {
        //if the user has consented OR if user consent requirement is turned off,
        //treat the user as having given consent
        return this.get('session.user.hasDataUsageConsent') || !Config['ember-simple-auth'].requiresConsent ?
            'user-is-consenting' :
            'user-is-nonconsenting';
    }),

    actions: {
        onUserChange(user) {
            let userId = user ? user.get('id') : null;

            this.setProperties({
                userId,
                username: null
            });

            this.get('advisor').set('selectedUser', user);

            //the change action needs to fire in the next run loop
            //so that the query param can be updated before any transitions are made
            Ember.run.next(this, function() {
                this.send('changeSelectedUser', userId);
            });
        },

        openCreateAccount() {
            this.send(
                'openModal',
                'create-account-modal',
                this.store.createRecord('user'),
                'create-account-modal'
            );
        }
    }
});
