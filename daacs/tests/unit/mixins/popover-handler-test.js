import Ember from 'ember';
import PopoverHandlerMixin from 'daacs/mixins/popover-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | popover handler');

// Replace this with your real tests.
test('it works', function(assert) {
  let PopoverHandlerObject = Ember.Object.extend(PopoverHandlerMixin);
  let subject = PopoverHandlerObject.create();
  assert.ok(subject);
});
