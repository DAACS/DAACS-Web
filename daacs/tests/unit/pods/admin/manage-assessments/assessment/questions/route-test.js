import { moduleFor, test } from 'ember-qunit';

moduleFor('route:admin/manage-assessments/assessment/questions', 'Unit | Route | admin/manage assessments/assessment/questions', {
  // Specify the other units that are required for this test.
  needs: ['service:user-events']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
