import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['student-select'],
    store: Ember.inject.service(),

    queryUsers(term, resolve, reject) {
        if(Ember.isBlank(term)) {
            return resolve([]);
        }

        this.get('store').query('user', {keywords: term}).then(resolve, reject);
    },

    actions: {
        searchUsers(term) {
            return new Ember.RSVP.Promise((resolve, reject) => {
                Ember.run.debounce(this, 'queryUsers', term, resolve, reject, 250);
            });
        },

        onSelectionChange(user) {
            this.set('selectedUser', user);
            if(this.attrs.onChange) {
                this.attrs.onChange(user);
            }
        }
    }
});
