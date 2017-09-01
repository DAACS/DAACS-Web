import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment-summary', 'Unit | Serializer | user assessment summary', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:user-assessment-summary',
      'transform:fragment-array'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
