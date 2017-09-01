import Ember from 'ember';
import CheckAbilitiesMixin from 'daacs/mixins/check-abilities';
import { module, test } from 'qunit';

module('Unit | Mixin | check abilities');

// Replace this with your real tests.
test('it works', function(assert) {
  let CheckAbilitiesObject = Ember.Object.extend(CheckAbilitiesMixin);
  let subject = CheckAbilitiesObject.create();
  assert.ok(subject);
});
