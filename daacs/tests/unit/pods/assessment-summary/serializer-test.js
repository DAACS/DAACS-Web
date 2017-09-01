import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-summary', 'Unit | Serializer | assessment summary', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:assessment-summary',
    'serializer:application',
    'transform:fragment',
    'transform:fragment-array',
    'model:assessment-prerequisite',
    'model:user-assessment-summary'
 ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
