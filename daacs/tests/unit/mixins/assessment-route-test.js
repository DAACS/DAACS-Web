import Ember from 'ember';
import AssessmentRouteMixin from 'daacs/mixins/assessment-route';
import { module, test } from 'qunit';

module('Unit | Mixin | assessment route');

// Replace this with your real tests.
test('it works', function(assert) {
  let AssessmentRouteObject = Ember.Object.extend(AssessmentRouteMixin);
  let subject = AssessmentRouteObject.create();
  assert.ok(subject);
});
