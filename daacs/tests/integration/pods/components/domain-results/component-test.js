import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('domain-results', 'Integration | Component | domain results', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('domains', []);

  this.render(hbs`{{domain-results domains=domains}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'More Info');
});
