import Ember from 'ember';
import FileReaderMixin from 'daacs/mixins/file-reader';
import { module, test } from 'qunit';

module('Unit | Mixin | file reader');

// Replace this with your real tests.
test('it works', function(assert) {
  let FileReaderObject = Ember.Object.extend(FileReaderMixin);
  let subject = FileReaderObject.create();
  assert.ok(subject);
});
