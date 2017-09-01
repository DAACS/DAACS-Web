import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delete-button', 'Integration | Component | delete button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{delete-button}}`);

  assert.ok(this.$('.remove-button'));

  // Template block usage:
  this.render(hbs`
    {{#delete-button}}
      template block text
    {{/delete-button}}
  `);
  assert.ok(this.$('.remove-button'));
});

test('Non-Block Confirmation Modal shows correctly', function(assert) {
  //Render non-block delete-button
  this.render(hbs`{{delete-button}}`);
  this.$('a').click();
  assert.equal(this.$(".confirmation-body").text().trim(), 'Are you sure you want to delete this item?');
  this.$('.btn.btn-danger').click();
});

test('Block Confirmation Modal shows correctly', function(assert) {
    //Render block delete-button
    this.render(hbs`{{#delete-button}}Test{{/delete-button}}`);
    this.$('a').click();
    assert.equal(this.$(".confirmation-body").text().trim(), 'Test');
    this.$('.btn.btn-danger').click();
});


test('Confirmation Modal fires remove event', function(assert) {
    //Render block delete-button
    this.on('remove', () => {
        assert.ok(true);
    });
    this.render(hbs`{{#delete-button remove="remove"}}Test{{/delete-button}}`);
    this.$('a').click();
    this.$('.btn.btn-success').click();
});
