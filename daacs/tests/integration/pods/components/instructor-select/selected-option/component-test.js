import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('instructor-select/selected-option', 'Integration | Component | instructor select/selected option', {
    integration: true
});

test('it renders', function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(hbs`{{instructor-select/selected-option}}`);

    assert.equal(this.$().text().trim(), '');
});
