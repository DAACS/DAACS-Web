import Ember from 'ember';
import AuthenticationMixin from 'daacs/mixins/authentication';
import { module, test } from 'qunit';

module('Unit | Mixin | authentication');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthenticationObject = Ember.Object.extend(AuthenticationMixin);
  let subject = AuthenticationObject.create();
  assert.ok(subject);
});
