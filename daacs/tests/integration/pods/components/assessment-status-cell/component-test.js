import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('assessment-status-cell', 'Integration | Component | assessment status cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{assessment-status-cell}}`);

  assert.equal(this.$().text().trim(), 'Inactive');
});
