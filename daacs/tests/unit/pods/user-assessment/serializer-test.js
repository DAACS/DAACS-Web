import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment', 'Unit | Serializer | user assessment', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:user-assessment',
      'transform:fragment',
      'transform:fragment-array',
      'model:user-assessment-writing-sample'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
