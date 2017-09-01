import Ember from 'ember';
import HandleApiErrorsMixin from 'daacs/mixins/handle-api-errors';
import { module, test } from 'qunit';

module('Unit | Mixin | handle api errors');

// Replace this with your real tests.
test('it works', function(assert) {
  let HandleApiErrorsObject = Ember.Object.extend(HandleApiErrorsMixin);
  let subject = HandleApiErrorsObject.create();
  assert.ok(subject);
});
