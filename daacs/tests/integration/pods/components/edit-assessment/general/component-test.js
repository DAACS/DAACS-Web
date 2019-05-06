import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/general', 'Integration | Component | edit assessment/general', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/general}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Name Category Select a category Type Select a type Multiple Choice CAT Likert Scale Writing Prompt Scoring Please select an assessment type first Prerequisites No prerequisites Add prerequisite');
});
