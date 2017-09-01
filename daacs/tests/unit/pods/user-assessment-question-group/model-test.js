import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-assessment-question-group', 'Unit | Model | user assessment question group', {
  // Specify the other units that are required for this test.
  needs: [
    'model:question-group-item'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
