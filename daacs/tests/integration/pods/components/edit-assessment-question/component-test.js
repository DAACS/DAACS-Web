import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment-question', 'Integration | Component | edit assessment question', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('item', {possibleItemAnswers: []});

  this.set('parent-form-validator', {
      registerChild() {},
      deregisterChild() {}
  });

  this.render(hbs`{{edit-assessment-question item=item parent-form-validator=parent-form-validator}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Question Text Answers');
});
