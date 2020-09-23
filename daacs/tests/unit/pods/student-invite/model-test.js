import { moduleForModel, test } from 'ember-qunit';

moduleForModel('student-invite', 'Unit | Model | student invite', {
    // Specify the other units that are required for this test.
    needs: ['model:student-invite']
});

test('it exists', function(assert) {
    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
});
