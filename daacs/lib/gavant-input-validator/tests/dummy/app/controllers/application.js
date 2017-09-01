import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    test: {presence: true},
    test2: {presence: true},
    test3: {presence: true},
    test4: {presence: true}
  },
  test: "",
  test2: "",
  test3: "",
  test4: "",

  actions: {
      showValidationFields: function() {
          this.set('showValidationFields', true);
      }
  }
});
