import Ember from 'ember';
import UserAssessmentRouteMixin from 'daacs/mixins/user-assessment-route';
import { module, test } from 'qunit';

module('Unit | Mixin | user assessment route');

// Replace this with your real tests.
test('it works', function(assert) {
  let UserAssessmentRouteObject = Ember.Object.extend(UserAssessmentRouteMixin);
  let subject = UserAssessmentRouteObject.create();
  assert.ok(subject);
});
