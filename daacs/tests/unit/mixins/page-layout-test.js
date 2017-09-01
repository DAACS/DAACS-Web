import Ember from 'ember';
import PageLayoutMixin from 'daacs/mixins/page-layout';
import { module, test } from 'qunit';

module('Unit | Mixin | page layout');

// Replace this with your real tests.
test('it works', function(assert) {
  let PageLayoutObject = Ember.Object.extend(PageLayoutMixin);
  let subject = PageLayoutObject.create();
  assert.ok(subject);
});
