import Ember from 'ember';
import RESTAdapter from 'ember-data/adapters/rest';
import config from 'daacs/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import HandleApiErrors from 'daacs/mixins/handle-api-errors';

export default RESTAdapter.extend(DataAdapterMixin, HandleApiErrors, {
    authorizer: 'authorizer:oauth2',
    host: config.RESTAPI,

    ajaxOptions() {
        let hash = this._super(...arguments);
        //use "traditional" style of param serialization (e.g. ?foo=A&foo=B vs ?foo[]=A&foo[]=B)
        hash.traditional = true;
        return hash;
    },

    isInvalid(status) {
        return status === 422 || status === 400;
    },

    pathForType() {
        let pathName = this._super(...arguments);
        return Ember.String.dasherize(pathName);
    },

    //should be able to remove this once the backend properly formats errors as an array
    parseErrorResponse() {
        let errorInfo = this._super(...arguments);

        if(errorInfo && errorInfo.errors && !Ember.isArray(errorInfo.errors)) {
            errorInfo.errors = Object.keys(errorInfo.errors).map((key) => {
                return {
                    detail: Ember.isArray(errorInfo.errors[key]) ? errorInfo.errors[key][0] : '',
                    meta: {failure_type: key}
                };
            });
        }

        return errorInfo;
    },

    //adds query parameter support for single resource requests
    //usage: store.findRecord('type', 123, {adapterOptions: {query: {foo: 'bar'}}});
    //@see https://github.com/emberjs/data/issues/3596#issuecomment-126604014
    appendQueryParams(url, snapshot) {
        let query = Ember.get(snapshot, 'adapterOptions.query');

        if(query) {
            url += `?${Ember.$.param(query)}`;
        }

        return url;
    },

    urlForFindRecord(id, modelName, snapshot) {
        let url = this._super(...arguments);
        return this.appendQueryParams(url, snapshot);
    },

    urlForUpdateRecord(id, modelName, snapshot) {
        let url = this._super(...arguments);
        return this.appendQueryParams(url, snapshot);
    }
});
