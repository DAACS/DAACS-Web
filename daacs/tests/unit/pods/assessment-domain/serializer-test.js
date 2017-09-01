import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-domain', 'Unit | Serializer | assessment domain', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:assessment-domain',
    'transform:fragment',
    'model:assessment-domain'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
