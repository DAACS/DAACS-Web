import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment-taken-date', 'Unit | Model | user assessment taken date', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
