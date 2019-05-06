import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-rubric', 'Unit | Serializer | assessment rubric', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:assessment-rubric',
      'transform:fragment',
      'transform:fragment-array'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
