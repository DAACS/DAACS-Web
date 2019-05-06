import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/domains', 'Integration | Component | edit assessment/domains', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/domains}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Name Type Low Medium High No domains found Add domain');
});
