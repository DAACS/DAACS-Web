import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loading-button', 'Integration | Component | loading button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{loading-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#loading-button}}
      template block text
    {{/loading-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});


test('Cant call action multiple times before promise returns', function(assert) {
  let actionFiredCount = 0;
  this.set('save', () => {
      return new Ember.RSVP.Promise((resolve) => {
           actionFiredCount++;
          Ember.run.later(() => {
              resolve();
          }, 500);
      });
  });
  // Template block usage:
  this.render(hbs`
    {{#loading-button clicked=(action save)}}
        Loading
    {{/loading-button}}
  `);

  this.$('button').click();
  this.$('button').click();

  assert.equal(actionFiredCount, 1);
});

test('Width is being set', function(assert) {
  let actionFiredCount = 0;
  this.set('save', () => {
      return new Ember.RSVP.Promise((resolve) => {
           actionFiredCount++;
          Ember.run.later(() => {
              resolve();
          }, 500);
      });
  });
  // Template block usage:
  this.render(hbs`
    {{#loading-button clicked=(action save)}}
        Loading
    {{/loading-button}}
  `);

  this.$('button').click();
  this.$('button').click();

  assert.equal(actionFiredCount, 1);
});
