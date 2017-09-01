import Ember from 'ember';
import Authentication from 'daacs/mixins/authentication';

export default Ember.Component.extend(Authentication, {
    classNames: ['page-navbar'],

    actions: {
        logout() {
            this.logout();
        }
    }
});
