import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-section', 'Integration | Component | page section', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#page-section}}
      template block text
    {{/page-section}}
  `);

  assert.equal(this.$('.page-content').text().trim(), 'template block text');
});
