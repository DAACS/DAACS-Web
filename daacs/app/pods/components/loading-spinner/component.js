import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['loading-spinner', 'active'],
    classNameBindings: ['large:lg']
});
