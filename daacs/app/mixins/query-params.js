import Ember from 'ember';

export default Ember.Mixin.create({
    getParamsObject (parameters, context = this) {
        let params = {};

        if (parameters && Ember.isArray(parameters)) {
            parameters.forEach((param) => {
                params[param] = context.get(param);
            });
        }
        if (context.get('sortBy')) {
            params.sortby = context.get('sortBy');
        }
        if (context.get('inlineCount')) {
            params.inlinecount = context.get('inlineCount');
        }
        return params;
    },
    removeEmptyQueryParams (queryParams) {
        for (let i in queryParams) {
            if (queryParams[i] === null || queryParams[i] === undefined || queryParams[i] === '' || (Ember.isArray(queryParams[i]) && queryParams[i].length === 0)) {
                // test[i] === undefined is probably not very useful here
                delete queryParams[i];
            }
        }
        return queryParams;
    }
});
