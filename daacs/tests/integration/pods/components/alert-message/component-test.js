import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('alert-message', 'Integration | Component | alert message', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{alert-message closeable=false text="The alert text"}}`);

  assert.equal(this.$().text().trim(), 'The alert text');

  // Template block usage:
  this.render(hbs`
    {{#alert-message closeable=false}}
      The alert text
    {{/alert-message}}
  `);

  assert.equal(this.$().text().trim(), 'The alert text');
});
