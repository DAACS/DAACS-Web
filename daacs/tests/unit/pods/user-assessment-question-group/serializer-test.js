import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment-question-group', 'Unit | Serializer | user assessment question group', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:user-assessment-question-group',
      'model:question-group-item'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
