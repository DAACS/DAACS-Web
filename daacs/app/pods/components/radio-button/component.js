import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'input',

    attributeBindings: [
        'checked',
        'disabled',
        'name',
        'required',
        'type',
        'value',
        'aria-label',
        'aria-labelledby'
    ],

    type: 'radio',
    value: null,
    groupValue: null,

    checked: Ember.computed('groupValue', 'value', function() {
        return this.get('groupValue') === this.get('value');
    }).readOnly(),

    sendChange(value) {
        this.attrs.onChange(value);
    },

    onInputChange: Ember.on('change', function() {
        let { value, groupValue } = this.getProperties('value', 'groupValue');

        if(groupValue !== value && this.attrs.onChange) {
            Ember.run.once(this, 'sendChange', value);
        }
    })
});
