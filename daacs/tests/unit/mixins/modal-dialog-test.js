import Ember from 'ember';
import ModalDialogMixin from 'daacs/mixins/modal-dialog';
import { module, test } from 'qunit';

module('Unit | Mixin | modal dialog');

// Replace this with your real tests.
test('it works', function(assert) {
  let ModalDialogObject = Ember.Object.extend(ModalDialogMixin);
  let subject = ModalDialogObject.create();
  assert.ok(subject);
});
