import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-category-summary', 'Unit | Model | assessment category summary', {
  // Specify the other units that are required for this test.
  needs: [
      'model:assessment-summary',
      'model:user-assessment-summary'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
