import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('question-result', 'Integration | Component | question result', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('questionItem', {
      questionNoImages: "This is the question text",
      possibleItemAnswers: [{
          score: 1,
          content: "Correct answer content"
      }]
  });

  this.render(hbs`{{question-result questionItem=questionItem}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Correct This is the question text More Info Correct answer content (Your answer) (Correct) You got this item correct. The answer is Correct answer content.');
});
