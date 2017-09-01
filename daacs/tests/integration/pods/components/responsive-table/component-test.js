import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('responsive-table', 'Integration | Component | responsive table', {
  integration: true
});

test('it renders', function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('columns', []);
    this.render(hbs`{{responsive-table columns=columns}}`);

    assert.equal(this.$().text().trim(), 'No results found');
});
