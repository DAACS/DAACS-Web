import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment-writing-sample', 'Unit | Model | user assessment writing sample', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
