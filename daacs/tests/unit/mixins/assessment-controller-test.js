import Ember from 'ember';
import AssessmentControllerMixin from 'daacs/mixins/assessment-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | assessment controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let AssessmentControllerObject = Ember.Object.extend(AssessmentControllerMixin);
  let subject = AssessmentControllerObject.create();
  assert.ok(subject);
});
