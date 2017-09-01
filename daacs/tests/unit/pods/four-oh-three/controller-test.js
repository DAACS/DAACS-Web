import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:four-oh-three', 'Unit | Controller | four oh three', {
  // Specify the other units that are required for this test.
  needs: ['service:user-events']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
