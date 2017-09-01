import Ember from 'ember';
import FileDownloadMixin from 'daacs/mixins/file-download';
import { module, test } from 'qunit';

module('Unit | Mixin | file download');

// Replace this with your real tests.
test('it works', function(assert) {
  let FileDownloadObject = Ember.Object.extend(FileDownloadMixin);
  let subject = FileDownloadObject.create();
  assert.ok(subject);
});
