import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: ['value:text-success:text-danger'],

    icon: Ember.computed('value', function() {
        return this.get('value') ? 'check-circle' : 'times-circle';
    })
});
