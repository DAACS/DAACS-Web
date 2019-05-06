import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/questions/cat/transitions/transition', 'Integration | Component | edit assessment/questions/cat/transitions/transition', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/questions/cat/transitions/transition}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Inclusive Exclusive to Inclusive Exclusive');
});
