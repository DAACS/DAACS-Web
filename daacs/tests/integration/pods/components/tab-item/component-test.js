import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tab-item', 'Integration | Component | tab item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
      {{#tab-view}}
        {{#tab-list}}
            {{tab-item}}
        {{/tab-list}}
      {{/tab-view}}
      `);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
      {{#tab-view}}
        {{#tab-list}}
            {{#tab-item}}
                template block text
            {{/tab-item}}
        {{/tab-list}}
      {{/tab-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
