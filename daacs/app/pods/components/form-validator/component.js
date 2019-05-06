import Ember from 'ember';

const {
    get,
    set,
    tryInvoke,
    run: {
        next
    },
    RSVP: {
        all,
        reject
    }
} = Ember;

export default Ember.Component.extend({
    tagName: 'form', //if this is changed, the loading button wont function properly due to form submit on enter key
    showValidationFields: false,

    init() {
        this._super(...arguments);
        set(this, 'childFormValidators', Ember.A());
        tryInvoke(this.attrs, 'onInit', [this]);
    },

    registerChild(formValidator) {
        get(this, 'childFormValidators').pushObject(formValidator);
    },

    deregisterChild(formValidator) {
        get(this, 'childFormValidators').removeObject(formValidator);
    },

    handleValidationFailure() {
        tryInvoke(this.attrs, 'validation-failure');
        this.showAllErrors();
        return reject();
    },

    showAllErrors() {
        set(this, 'showValidationFields', true);
        // Were doing this so that if they click save again, we show all possible validation fields.
        // This prevents the case of clicking save, clicking a button that shows extra fields,
        // then clicking save again and not seeing all validations
        next(this, () => set(this, 'showValidationFields', false));
    },

    actions: {
        async formSubmit(params) {
            const allValidations = [get(this, '_targetObject').validate()];
            get(this, 'childFormValidators').forEach((validator) => allValidations.push(get(validator, '_targetObject').validate()));

            try {
                await all(allValidations);
                return tryInvoke(this.attrs, 'submit', [params]);
            } catch(error) {
                get(this, 'childFormValidators').invoke('handleValidationFailure');
                return this.handleValidationFailure();
            }
        }
    }
});
