import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'form', //if this is changed, the loading button wont function properly due to form submit on enter key
    showValidationFields: false,

    init() {
        this._super(...arguments);
        this.set('childFormValidators', Ember.A());
    },

    registerChild(formValidator) {
        this.get('childFormValidators').pushObject(formValidator);
    },

    deregisterChild(formValidator) {
        this.get('childFormValidators').removeObject(formValidator);
    },

    handleValidationFailure() {
        if(Ember.canInvoke(this.attrs, 'validation-failure')) {
            this.attrs['validation-failure']();
        }

        this.set('showValidationFields', true);
        return new Ember.RSVP.Promise(function(resolve, reject) {
            reject();
            // Were doing this so that if they click save again, we show all possible validation fields.
            // This prevents the case of clicking save, clicking a button that shows extra fields,
            // then clicking save again and not seeing all validations
            this.set('showValidationFields', false);
        });
    },

    actions: {
        formSubmit(params) {
            let allValidations = [this.get('_targetObject').validate()];

            this.get('childFormValidators').forEach((validator) => allValidations.push(validator.get('_targetObject').validate()));

            return Ember.RSVP.all(allValidations).then(() => {
                return this.attrs.submit(params);
            }).catch(() => {
                this.get('childFormValidators').invoke('handleValidationFailure');
                return this.handleValidationFailure();
            });
        }
    }
});
