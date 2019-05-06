import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment-domain', 'Integration | Component | edit assessment domain', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('domain', {rubric: {supplementTable: []}});

  this.set('parent-form-validator', {
      registerChild() {},
      deregisterChild() {}
  });

  this.render(hbs`{{edit-assessment-domain domain=domain parent-form-validator=parent-form-validator}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Missing translation: admin.editAssessment.domain.info Missing translation: admin.editAssessment.domain.description');
});
