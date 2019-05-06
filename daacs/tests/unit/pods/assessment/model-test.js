import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment', 'Unit | Model | assessment', {
  // Specify the other units that are required for this test.
  needs: [
      'model:assessment-domain',
      'model:user-assessment-question-group',
      'model:user-assessment-writing-sample',
      'model:assessment-category-group'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
