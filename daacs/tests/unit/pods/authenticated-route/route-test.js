import { moduleFor, test } from 'ember-qunit';

moduleFor('route:authenticated-route', 'Unit | Route | authenticated route', {
  // Specify the other units that are required for this test.
  needs: ['service:user-events']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
