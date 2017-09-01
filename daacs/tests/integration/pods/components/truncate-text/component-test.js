import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('truncate-text', 'Integration | Component | truncate text', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{truncate-text text="This is some truncated text" numChars=12}}`);

  assert.equal(this.$().text().trim(), 'This is some...\nSee More');
});
