import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment-question-answer', 'Unit | Serializer | user assessment question answer', {
  // Specify the other units that are required for this test.
  needs: [
      'serializer:user-assessment-question-answer',
      'model:question-group-item'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
