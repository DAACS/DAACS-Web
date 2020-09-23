import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['instructor-select'],
    store: Ember.inject.service(),

    queryInstructors(term, resolve, reject) {
        if(Ember.isBlank(term)) {
            return resolve([]);
        }

        this.get('store').query('user', {role: 'ROLE_INSTRUCTOR', keywords: term}).then(resolve, reject);
    },

    actions: {
        searchInstructors(term) {
            return new Ember.RSVP.Promise((resolve, reject) => {
                Ember.run.debounce(this, 'queryInstructors', term, resolve, reject, 250);
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
