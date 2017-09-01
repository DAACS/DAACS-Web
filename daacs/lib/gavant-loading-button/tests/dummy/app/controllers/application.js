import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        clickWithPromise() {
            return new Ember.RSVP.Promise((resolve) => {
                Ember.run.later(this, resolve, 2000);
            });
        },

        clickWithoutPromise() {
            return true;
        }
    }
});
