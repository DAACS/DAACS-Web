import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'label',
    classNames: ['table-radio-cell'],

    radioName: Ember.computed('column.radioNamePath', 'column.radioName', function() {
        let path = this.get('column.radioNamePath'),
            name = this.get('column.radioName');
        return path ? this.get(`row.content.${path}`) : name;
    }),

    radioValue: Ember.computed('column.radioValuePath', 'column.radioValue', function() {
        let path = this.get('column.radioValuePath'),
            value = this.get('column.radioValue');
        return path ? this.get(`row.content.${path}`) : value;
    })
});
