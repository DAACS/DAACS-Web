import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('active-link', 'Integration | Component | active link', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{active-link "Index" "index"}}`);

  assert.equal(this.$().text().trim(), 'Index');

  // Template block usage:
  this.render(hbs`
    {{#active-link "index"}}
      template block text
    {{/active-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
