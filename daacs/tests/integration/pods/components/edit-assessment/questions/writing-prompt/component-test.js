import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/questions/writing-prompt', 'Integration | Component | edit assessment/questions/writing prompt', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/questions/writing-prompt}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Writing prompt HTML content that is displayed above the text input for Writing assessments. Minimum number of words');
});
