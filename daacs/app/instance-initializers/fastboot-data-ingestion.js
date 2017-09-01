import Ember from 'ember';

export function initialize(applicationInstance) {
    let fastboot = applicationInstance.lookup('service:fastboot');
    let shoebox = fastboot? fastboot.get('shoebox') : null;
    if (!shoebox) { return; }
    let data = shoebox.retrieve('ember-data-store');
    if (!data || !data.records) { return; }
    let store = applicationInstance.lookup('service:store');

    Object.keys(data.records).forEach((type) => {
        let obj = {};
        //If theres data for this type of record modify it to the correct format for ember data store ingestion
        obj[Ember.Inflector.inflector.pluralize(type)] = data.records[type];
        store.pushPayload(type, obj);
    });
}

export default {
  name: 'fastboot-data-ingestion',
  initialize
};
