import { moduleFor, test } from 'ember-qunit';

moduleFor('route:four-oh-three', 'Unit | Route | four oh three', {
  // Specify the other units that are required for this test.
  needs: ['service:user-events']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
