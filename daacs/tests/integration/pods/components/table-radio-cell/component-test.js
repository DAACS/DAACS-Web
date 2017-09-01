import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-radio-cell', 'Integration | Component | table radio cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('tableActions', {
      onRadioChange() {

      }
  });

  this.render(hbs`{{table-radio-cell tableActions=tableActions}}`);

  assert.equal(this.$().text().trim(), '');
});
