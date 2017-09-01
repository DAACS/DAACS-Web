import Ember from 'ember';
import QueryParams from './query-params';

const { computed, get, set, setProperties } = Ember;

export default Ember.Mixin.create(QueryParams, {
    hasMore: true,
    isBusy: false,
    pagesLoaded: 1,
    limit: 10,
    pagingTarget: 'model',

    offset: computed('pagingObject.[]', function() {
        return get(this, 'pagingObject.length');
    }),

    typeKey: computed('pagingTarget', 'model', '_typeKey', function() {
        let pagingTarget = get(this, 'pagingTarget'),
            typeKey = get(this, '_typeKey'),
            target = get(this, 'model').get(pagingTarget);

        if(pagingTarget === 'model') {
            return typeKey;
        }

        return get(target, 'content').type.modelName;
    }),

    pagingObject: computed('pagingTarget', 'model', function() {
        let pagingTarget = get(this, 'pagingTarget'),
            model = get(this, 'model');

        if(pagingTarget === 'model') {
            return model;
        }

        return get(this, pagingTarget);
    }),

    async loadModels(params, reset) {
        let queryParams = this.getParamsObject(params),
        typeKey = get(this, 'typeKey');

        if(reset) {
            this.clearModels();
        }

        queryParams.offset = get(this, 'offset');
        queryParams.limit = get(this, 'limit');
        queryParams = this.removeEmptyQueryParams(queryParams);

        if(!typeKey) {
            return Ember.RSVP.reject();
        }

        try {
            set(this, 'isBusy', true);
            let response = await this.store.query(typeKey, queryParams);
            let newContent = response.toArray();

            if(reset) {
                set(this, get(this, 'pagingTarget'), response);
            } else {
                get(this, 'pagingObject').pushObjects(newContent);
            }

            setProperties(this, {
                isBusy: false,
                hasMore: newContent.length >= get(this, 'limit'),
                metadata: response.get('meta'),
                pagesLoaded: get(this, 'pagesLoaded') + 1
            });

            return newContent;
        } catch(error) {
            set(this, 'isBusy', false);
            return Ember.RSVP.reject(error);
        }
    },

    clearModels() {
        set(this, get(this, 'pagingTarget'), []);
        set(this, 'pagesLoaded', 0);
    },

    async removeModel(model) {
        try {
            let result = await model.destroyRecord();
            get(this, 'content').removeObject(model);
            return result;
        } catch(error) {
            return Ember.RSVP.reject(error);
        }
    },

    actions: {
        loadMoreModels() {
            return this.loadModels(get(this, 'serverQueryParams'));
        },

        reloadModels() {
            return this.loadModels(get(this, 'serverQueryParams'), true);
        },

        removeModel(model) {
            this.removeModel(model);
        },

        clearModels() {
            this.clearModels();
        }
    }
});
