import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('confirmation-save-button', 'Integration | Component | confirmation save button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{confirmation-save-button}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Are you sure you want to continue? Yes No');

  // Template block usage:
  this.render(hbs`
    {{#confirmation-save-button}}
      template block text
    {{/confirmation-save-button}}
  `);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'template block text Are you sure you want to continue? Yes No');
});
