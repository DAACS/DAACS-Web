import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wizard-form/stepper/step', 'Integration | Component | wizard form/stepper/step', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // this.render(hbs`{{wizard-form/stepper/step}}`);

  this.render(hbs`
      {{#tab-view}}
        {{#wizard-form/stepper}}
            {{wizard-form/stepper/step}}
        {{/wizard-form/stepper}}
      {{/tab-view}}
      `);

  assert.equal(this.$().text().trim(), '1');
});
