import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/rubric/score', 'Integration | Component | edit assessment/rubric/score', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/rubric/score}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Inclusive Exclusive to Inclusive Exclusive');
});
