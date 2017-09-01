import Ember from 'ember';
import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
    payloadKeyFromModelName() {
        return 'data';
    },
    // Custom json root. The API returns objects in the "data" key.
    // We need to re-assign it to the singular version of the model name.
    // So {data: {name: foo}} becomes {post: {name: foo}}

    normalizeSingleResponse(store, primaryModelClass, payload) {
        let typeKey = primaryModelClass.modelName;
        payload[typeKey] = payload['data'];
        delete payload['data'];
        return this._super(...arguments);
    },
    // Custom json root. The API returns objects in the "data" key.
    // We need to re-assign it to the plural version of the model name.
    // So {data: [{post1}, {post2}]} becomes {posts: [{post1},{post2}]}
    normalizeArrayResponse(store, primaryModelClass, payload) {
        let pluralTypeKey = Ember.Inflector.inflector.pluralize(primaryModelClass.modelName);
        payload[pluralTypeKey] = payload['data'];
        delete payload['data'];
        return this._super(...arguments);
    },

    extractMeta(store, type, payload) {
        if (payload && payload.hasOwnProperty('metaData')) {
            let meta = payload.metaData;
            delete payload.metaData;
            store.setMetadataFor(type.modelName, meta);
        }
    },

    extractErrors(store, typeClass, payload) {
        if (payload && typeof payload === 'object' && payload._problems) {
            payload = payload._problems;
            this.normalizeErrors(typeClass, payload);
        }
        return payload;
    },

    serialize(snapshot, options) {
        if(!options) {
            options = {};
        }

        //include the record ID in the request body for PUTs, ect
        options.includeId = true;

        return this._super(snapshot, options);
    }
});
