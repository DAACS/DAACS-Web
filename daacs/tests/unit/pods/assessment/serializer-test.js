import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment', 'Unit | Serializer | assessment', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:assessment',
      'transform:fragment',
      'transform:fragment-array',
      'model:assessment-domain',
      'model:user-assessment-question-group',
      'model:user-assessment-writing-sample'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
