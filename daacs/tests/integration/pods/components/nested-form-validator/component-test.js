import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nested-form-validator', 'Integration | Component | nested form validator', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('parent', {
      registerChild() {},
      deregisterChild() {}
  });

  this.render(hbs`{{nested-form-validator parent=parent}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nested-form-validator parent=parent}}
      template block text
    {{/nested-form-validator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
