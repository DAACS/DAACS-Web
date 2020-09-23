import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table/cell/student-scores', 'Integration | Component | table/cell/student scores', {
  integration: true
});

test('it renders', function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(hbs`{{table/cell/student-scores}}`);

    assert.equal(this.$().text().trim(), '');
});
