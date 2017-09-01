import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import DS from 'ember-data';

moduleFor('serializer:shoebox', 'Unit | Serializer | shoebox', {
  // Specify the other units that are required for this test.
  needs: ['serializer:shoebox']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
    // create a dummy model for application
    let DummyModel = DS.Model.extend({
      name: DS.attr('string'),
      address: DS.attr('string')
    });
    this.registry.register('model:application', DummyModel);

    let store = Ember.getOwner(this).lookup('service:store');

    let basicModel = {
      name: 'Test Name',
      address: 'SOme Dummy Address'
    };

    let expectedHash = {
      data: {
        attributes: {
          name: basicModel.name,
          address: basicModel.address
        },
        type: 'applications'
      }
    };

    Ember.run(function(){

      // Create an instance of DummyModel and serialize
      let serializedRecord = store.createRecord('application', basicModel).serialize();
      assert.deepEqual(serializedRecord, expectedHash);

    });
});
