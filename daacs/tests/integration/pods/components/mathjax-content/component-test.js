import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mathjax-content', 'Integration | Component | mathjax content', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mathjax-content content="this is some content"}}`);

  assert.equal(this.$().text().trim(), 'this is some content');
});
