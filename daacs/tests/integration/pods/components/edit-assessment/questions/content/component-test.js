import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/questions/content', 'Integration | Component | edit assessment/questions/content', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/questions/content}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'No supplement Word Problem Formula Passage');
});
