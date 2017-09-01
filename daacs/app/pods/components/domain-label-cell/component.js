import Ember from 'ember';

const {
    computed: { alias }
} = Ember;

export default Ember.Component.extend({
    classNames: ['domain-label-cell'],
    classNameBindings: ['isSubdomain:cell-indented'],
    isSubdomain: alias('row.isSubdomain')
});
