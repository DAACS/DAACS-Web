
import { lowerCase } from 'daacs/helpers/lower-case';
import { module, test } from 'qunit';

module('Unit | Helper | lower case');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = lowerCase(['TEST']);
  assert.equal(result, 'test');
});
