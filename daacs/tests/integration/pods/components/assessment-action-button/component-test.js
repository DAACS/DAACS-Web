import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import tHelper from 'ember-i18n/helper';

moduleForComponent('assessment-action-button', 'Integration | Component | assessment action button', {
  integration: true,

  beforeEach() {
    // set the locale:
    this.container.lookup('service:i18n').set('locale', 'en');

    // register the helper:
    this.registry.register('helper:t', tHelper);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{assessment-action-button}}`);

  assert.equal(this.$().text().trim(), 'Not Started');
});
