import { trim } from 'daacs/helpers/trim';
import { module, test } from 'qunit';

module('Unit | Helper | trim');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = trim(['    Trim me   ']);
  assert.equal(result, 'Trim me');
});
