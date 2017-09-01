import Ember from 'ember';
import RowComponent from 'ember-light-table/components/lt-row';

export default RowComponent.extend({
    classNames: ['active-table-row'],
    classNameBindings: ['isActive'],
    isActive: Ember.computed.alias('row.content.rowIsActive')
});
