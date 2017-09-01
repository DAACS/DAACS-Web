import Ember from 'ember';
import QueryParams from './query-params';
import ScrollReset from './scroll-reset';

const { get, merge, setProperties } = Ember;

export default Ember.Mixin.create(QueryParams, ScrollReset, {
    buildQueryParams(controller, queryParamListName, offset, limit, routeParams = {}) {
        let params = routeParams,
            queryParams = this.getParamsObject(get(controller, queryParamListName), controller);
        params = merge(params, queryParams);
        params.offset = offset;
        params.limit = limit;
        return this.removeEmptyQueryParams(params);
    },

    async pagingQuery(name, params, controllerName) {
        let controller = this.controllerFor(controllerName),
            models = await this.store.query(name, params);

        setProperties(controller, {
            hasMore: get(models, 'length') >= get(controller, 'limit'),
            pagesLoaded: 1,
            metadata: models.get('meta'),
            _typeKey: models.type.modelName
        });

        return models.toArray();
    }
});
