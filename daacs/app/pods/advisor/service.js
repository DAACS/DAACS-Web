import Ember from 'ember';

export default Ember.Service.extend({
    selectedUser: null,
    selectedUserId: Ember.computed.alias('selectedUser.id')
});
