import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-category-summary', 'Unit | Serializer | assessment category summary', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:assessment-category-summary',
      'model:assessment-summary',
      'model:user-assessment-summary'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
