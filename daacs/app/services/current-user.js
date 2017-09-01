import Ember from 'ember';
const { inject: { service }} = Ember;

export default Ember.Service.extend({
    store: service(),
    session: service(),
    ajax: service(),
    fastboot: service(),

    load() {
        // We need to do this because when we request the user with /me its being returned with an actual id.
        // That means there are now two users in the store at this point, a blank user with an ID of me, and a user thats correct with the real id
        // But then when the app would boot up after the fastboot page was rendered, it would look for a user with an ID of me and find that it had no permissions
        // so we were seeing the page rendered with fastboot, but then redirected to a 403 after the spa app took over.
        if (this.get('fastboot.isFastBoot')) {
            return this.get('ajax').request('users/me').then(user => {
                user = user.data;
                user.id = 'me';
                this.get('store').pushPayload('user', { user });
                let me = this.get('store').peekRecord('user', 'me');
                this.set('user', me);
                this.get('session').set('user', me);
                return me;
            });
        } else {
            return this.get('store').findRecord('user', 'me').then((user) => {
                this.get('session').set('user', user);
                return user;
            });
        }
    }
});
