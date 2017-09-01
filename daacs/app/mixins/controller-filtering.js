import Ember from 'ember';
import QueryParams from './query-params';
import Pagination from 'daacs/mixins/controller-pagination';

const { setProperties } = Ember;

export default Ember.Mixin.create(QueryParams, Pagination, {
    filterModels() {
        return this.loadModels(this.get('serverQueryParams'), true);
    },

    changeSorting(sort, dir) {
        setProperties(this, {
            sortBy: sort,
            sortDirection: dir
        });

        return this.loadModels(this.get('serverQueryParams'), true);
    },

    actions: {
        filter() {
            //TODO may need to update form-validator to enable closure-action support and returning a promise
            return this.filterModels();
        },

        changeSorting(sort, dir) {
            return this.changeSorting(sort, dir);
        }
    }
});
