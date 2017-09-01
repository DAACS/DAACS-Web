import Ember from 'ember';
import ControllerPaginationMixin from 'daacs/mixins/controller-pagination';
import { module, test } from 'qunit';

module('Unit | Mixin | controller pagination');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllerPaginationObject = Ember.Object.extend(ControllerPaginationMixin);
  let subject = ControllerPaginationObject.create();
  assert.ok(subject);
});
