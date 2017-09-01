import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-validator', 'Integration | Component | input validator', {
  integration: true
});

test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#input-validator target="model.name" text="Name"}}
        {{input type="text" value=test}}
    {{/input-validator}}
  `);

  assert.equal(this.$('label').text().trim(), 'Name');
});


test('Show error', function(assert) {
  this.set('errors', {
     name: ' can not be empty'
  });
  //Usually you don't provide the targetObject, but to direct the input validator to validate based off of properties set here in the test, we provide the targetObject
  this.render(hbs`
    {{#input-validator target="name" text="Name" targetObject=this}}
        {{input type="text" value=name}}
    {{/input-validator}}
  `);
  this.set('showValidationFields', true);

  assert.equal(this.$('.input-validation-error b').text().trim(), 'Name can not be empty');
});

test('Updates label\'s for="" attribute - input', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#input-validator target="model.name" text="Name"}}
        {{input type="text" value=test}}
    {{/input-validator}}
  `);

  assert.equal(this.$('label.input-validator-label').attr('for'), this.$('input:first').attr('id'));
});

test('Updates label\'s for="" attribute - select', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#input-validator target="model.name" text="Name"}}
        <select id="select-id">
            <option value="test">Test</option>
        </select>
    {{/input-validator}}
  `);

  assert.equal(this.$('label.input-validator-label').attr('for'), this.$('select:first').attr('id'));
});

test('Updates label\'s for="" attribute - textarea', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#input-validator target="model.name" text="Name"}}
        {{textarea value=test}}
    {{/input-validator}}
  `);

  assert.equal(this.$('label.input-validator-label').attr('for'), this.$('textarea:first').attr('id'));
});

test('Other label elements\' for="" attributes are not modified', function(assert) {
  // Template block usage:
  this.render(hbs`
    <label class="external-label" for="unchanged">External Label</label>
    {{#input-validator target="model.name" text="Name"}}
        {{input type="text" value=test}}
        <label class="other-internal-label" for="unchanged">Other internal label</label>
    {{/input-validator}}
  `);

  assert.equal(this.$('label.external-label').attr('for'), 'unchanged');
  assert.equal(this.$('label.other-internal-label').attr('for'), 'unchanged');
});
