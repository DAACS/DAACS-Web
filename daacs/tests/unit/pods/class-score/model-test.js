import { moduleForModel, test } from 'ember-qunit';

moduleForModel('class-score', 'Unit | Model | class score', {
    // Specify the other units that are required for this test.
    needs: ['model:class-score']
});

test('it exists', function(assert) {
    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
});
