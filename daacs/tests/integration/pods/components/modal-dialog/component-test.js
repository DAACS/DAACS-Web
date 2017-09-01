import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('modal-dialog', 'Integration | Component | modal dialog', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
    {{#modal-dialog}}
      template block text
    {{/modal-dialog}}
  `);

  assert.equal(this.$('.yielded-content').text().trim(), 'template block text');
  Ember.$('.modal-backdrop').remove();
  Ember.$('.modal-open').removeClass('modal-open');
});
