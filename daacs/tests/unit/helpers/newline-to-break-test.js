import { newlineToBreak } from 'daacs/helpers/newline-to-break';
import { module, test } from 'qunit';

module('Unit | Helper | newline to break');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = newlineToBreak(["Testing\nnew lines\nto\nbreaks"]);
  assert.equal(result.string, "Testing<br>\nnew lines<br>\nto<br>\nbreaks");
});
