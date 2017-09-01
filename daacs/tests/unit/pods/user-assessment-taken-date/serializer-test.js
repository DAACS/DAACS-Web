import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment-taken-date', 'Unit | Serializer | user assessment taken date', {
  // Specify the other units that are required for this test.
  needs: ['serializer:user-assessment-taken-date']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
