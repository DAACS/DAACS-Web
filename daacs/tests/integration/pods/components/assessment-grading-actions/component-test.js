import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('assessment-grading-actions', 'Integration | Component | assessment grading actions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('tableActions', {
      retryGrading() {

      }
  });

  this.render(hbs`{{assessment-grading-actions tableActions=tableActions}}`);

  assert.equal(this.$().text().trim(), 'Grading...');
});
