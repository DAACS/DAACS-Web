import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment', 'Unit | Model | user assessment', {
  // Specify the other units that are required for this test.
  needs: [
      'model:user-assessment-writing-sample'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
