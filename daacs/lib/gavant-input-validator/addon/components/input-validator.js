import Ember from 'ember';
import layout from '../templates/components/input-validator';

const {
    get,
    set,
    isEmpty,
    Component,
    computed,
    observer,
    defineProperty,
} = Ember;

export default Component.extend({
    layout: layout,
    classNames: [ 'form-group', 'input-validator' ],
    classNameBindings: ['hasError:has-error', 'label:hasLabel', 'showAllValidations:force-error-display'],
    hasError: false,
    error: null,
    label: true,

    focusOut() {
        return set(this, 'hasError', !isEmpty(get(this, 'error')));
    },

    showAllValidations: computed.reads('targetObject.showValidationFields'),

    targetObject: computed(function () {
        return this.getFormComponent(this.get('parentView'));
    }).volatile(),

    getFormComponent(parentView) {
        if (!parentView) {
            return null;
        }
        if (parentView.get('tagName') === 'form') {
            return parentView;
        }
        return this.getFormComponent(parentView.get('parentView'));
    },

    fieldLabel: computed('nameString', 'text', function() {
        let text = get(this, 'text');
        if (text) {
            return text;
        } else {
            return get(this, 'nameString');
        }
    }),

    nameString: computed('target', function() {
        let target = get(this, 'target');
        return target.string ? target.string : target;
    }),

    showAllValidationsDidChange: observer('showAllValidations', function() {
        let showValidationFields = get(this, 'showAllValidations');
        let error = get(this, 'error');
        if (showValidationFields && showValidationFields === true) {
            set(this, 'hasError', !isEmpty(error));
        }
    }),

    didRender() {
        let id = this.$('input, select, textarea').first().attr('id');
        this.$('label.input-validator-label').attr('for', id);
        defineProperty(this, 'error', computed.reads(`targetObject.errors.${this.get('nameString')}`));
    }
});
