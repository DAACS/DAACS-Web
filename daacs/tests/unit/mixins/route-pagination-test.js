import Ember from 'ember';
import RoutePaginationMixin from 'daacs/mixins/route-pagination';
import { module, test } from 'qunit';

module('Unit | Mixin | route pagination');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutePaginationObject = Ember.Object.extend(RoutePaginationMixin);
  let subject = RoutePaginationObject.create();
  assert.ok(subject);
});
