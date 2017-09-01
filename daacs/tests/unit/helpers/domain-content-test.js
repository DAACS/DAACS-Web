import { domainContent } from 'daacs/helpers/domain-content';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | domain content');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = domainContent(['label', 'advanced_calculus', [Ember.Object.create({id: 'advanced_calculus', label: 'Advanced Calculus'})]]);
  assert.equal(result, 'Advanced Calculus');
});
