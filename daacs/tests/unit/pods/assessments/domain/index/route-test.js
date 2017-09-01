import { moduleFor, test } from 'ember-qunit';

moduleFor('route:assessments/domain/index', 'Unit | Route | assessments/domain/index', {
  // Specify the other units that are required for this test.
  needs: ['service:user-events']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
