import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/questions/multiple-choice', 'Integration | Component | edit assessment/questions/multiple choice', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/questions/multiple-choice}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Import questions... No groups found Add group');
});
