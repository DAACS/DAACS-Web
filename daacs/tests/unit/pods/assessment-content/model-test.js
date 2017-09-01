import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assessment-content', 'Unit | Model | assessment content', {
  // Specify the other units that are required for this test.
  needs: ['model:assessment-domain']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
