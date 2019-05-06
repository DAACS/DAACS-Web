import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/questions', 'Integration | Component | edit assessment/questions', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/questions}}`);

  assert.equal(this.$().text().trim(), 'You must select an assessment type first');
});
