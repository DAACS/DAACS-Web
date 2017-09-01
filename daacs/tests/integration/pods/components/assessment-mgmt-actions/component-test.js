import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('assessment-mgmt-actions', 'Integration | Component | assessment mgmt actions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('tableActions', {
      toggleAssessment() {

      }
  });

  this.render(hbs`{{assessment-mgmt-actions tableActions=tableActions}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'View Activate');
});
