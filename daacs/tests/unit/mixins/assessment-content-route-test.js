import Ember from 'ember';
import AssessmentContentRouteMixin from 'daacs/mixins/assessment-content-route';
import { module, test } from 'qunit';

module('Unit | Mixin | assessment content route');

// Replace this with your real tests.
test('it works', function(assert) {
  let AssessmentContentRouteObject = Ember.Object.extend(AssessmentContentRouteMixin);
  let subject = AssessmentContentRouteObject.create();
  assert.ok(subject);
});
