import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-summary', 'Unit | Model | assessment summary', {
  // Specify the other units that are required for this test.
  needs: [
      'model:user-assessment-summary',
      'model:assessment-category-group'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
