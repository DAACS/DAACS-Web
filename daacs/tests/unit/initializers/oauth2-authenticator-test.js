import Ember from 'ember';
import Oauth2AuthenticatorInitializer from 'daacs/initializers/oauth2-authenticator';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | oauth2 authenticator', {
  needs: ['config:environment'],
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  Oauth2AuthenticatorInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
