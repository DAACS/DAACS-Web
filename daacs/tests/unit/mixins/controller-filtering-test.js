import Ember from 'ember';
import ControllerFilteringMixin from 'daacs/mixins/controller-filtering';
import { module, test } from 'qunit';

module('Unit | Mixin | controller filtering');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllerFilteringObject = Ember.Object.extend(ControllerFilteringMixin);
  let subject = ControllerFilteringObject.create();
  assert.ok(subject);
});
