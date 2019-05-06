import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-content', 'Unit | Serializer | assessment content', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:assessment-content',
      'transform:fragment',
      'model:assessment-domain',
      'model:assessment-category-group'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
