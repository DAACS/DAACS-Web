import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';
import Table from 'ember-light-table';

const {
    on,
    observer,
    computed,
    inject: { service },
    run: {
        next,
        schedule
    },
    computed: {
        not
    }
} = Ember;

export default Ember.Component.extend({
    i18n: service(),
    classNames: ['responsive-table'],

    columns: null,
    models: null,
    isLoading: false,
    canLoadMore: true,
    canSelect: false,
    multiSelect: false,
    canExpand: false,
    expandOnClick: true,
    multiRowExpansion: true,
    pinnedHeader: true,
    fixedHeader: false,
    fixedFooter: false,
    fixedTopOffset: -20,
    showHeader: true,
    showFooter: false,
    sortColumnOnClick: true,
    multiColumnSort: false,
    height: null,
    noResultsText: t('tables.noResults'),
    hoverableRows: true,
    clickableRows: false,
    condensedRows: false,
    stripedRows: false,
    tableClasses: '',
    tableActions: {},
    prevSelectedRowIndex: -1,
    rowComponent: null,
    spannedRowComponent: null,
    infinityComponent: null,

    table: null,
    notLoading: not('isLoading'),

    tableClassNames: computed('hoverableRows', 'clickableRows', 'condensedRows', 'stripedRows', 'tableClasses', function() {
        let classes = ['table', this.get('tableClasses')];

        if(this.get('hoverableRows')) {
            classes.push('table-hover');
        }

        if(this.get('clickableRows')) {
            classes.push('table-clickable-rows');
        }

        if(this.get('condensedRows')) {
            classes.push('table-condensed');
        }

        if(this.get('stripedRows')) {
            classes.push('table-striped');
        }

        return classes.join(' ');
    }),

    onColumnsChange: observer('columns.[]', function() {
        next(this, 'updateColumns', this.get('columns'));
    }),

    onModelsChange: observer('models', function() {
        this.get('table').setRows(this.get('models'));
        this.set('prevSelectedRowIndex', -1);
    }),

    onMediaChange: observer('media.isMobile', 'media.isTablet', 'media.isDesktop', 'media.isJumbo', function() {
        schedule('afterRender', this, 'setHeaderMinHeight');
    }),

    onInsertElement: on('didInsertElement', function() {
        schedule('afterRender', this, 'setHeaderMinHeight');
    }),

    onDidUpdate: on('didUpdate', function() {
        schedule('afterRender', this, 'setHeaderMinHeight');
    }),

    onDidUpdateAttrs: on('didUpdateAttrs', function() {
        schedule('afterRender', this, 'setHeaderMinHeight');
    }),

    init() {
        this._super(...arguments);
        this.set('table', new Table(this.get('columns') || [], this.get('models') || []));
    },

    async fetchMoreRecords() {
        //make the fetchRecords attribute optional, for instance if a static set of rows/models are provided
        if(this.attrs.fetchRecords) {
            let models = await this.attrs.fetchRecords()
            this.get('table').addRows(models);
        }
    },

    changeTableSorting(col) {
        //sorting is optional
        if(this.attrs.changeSorting) {
            this.attrs.changeSorting(col.get('sortProperty') || col.get('valuePath'), col.get('ascending') ? 'asc' : 'desc');
        }
    },

    updateColumns(newColumns) {
        this.clearTable();
        this.get('table').setColumns(newColumns);
        schedule('afterRender', this, 'setHeaderMinHeight');
        this.fetchMoreRecords();
    },

    clearTable() {
        this.set('prevSelectedRowIndex', -1);
        //send an action up to clear the controller's model/num pages loaded, ect
        if(this.attrs.clearTable) {
            this.attrs.clearTable();
        }
    },

    async removeRow(row) {
        if(this.attrs.removeRow) {
            await this.attrs.removeRow(row.get('content'))
            this.get('table').removeRow(row);
        }
    },

    setHeaderMinHeight() {
        //for fixed headers, we need to set a min-height on its wrapper element,
        //so that when the header becomes fixed, that area maintains its same height
        //so that a reflow is not triggered, causing jumpiness/inability to scroll down
        if(this.get('fixedHeader')) {
            this.$('.affixed-table-header-container').css('min-height', `${this.$('.lt-head-wrap:first').height()}px`);
        }
    },

    actions: {
        scrolledToBottom() {
            if(this.get('canLoadMore')) {
                this.fetchMoreRecords();
            }
        },

        rowClick() {
            //row click handling is optional
            if(this.attrs.onRowClick) {
                this.attrs.onRowClick(...arguments);
            }
        },

        rowDoubleClick() {
            //row double click handling is optional
            if(this.attrs.onRowDoubleClick) {
                this.attrs.onRowDoubleClick(...arguments);
            }
        },

        columnClick(col) {
            if(col.get('sorted')) {
                this.changeTableSorting(col);
            }
        },

        removeRow(row) {
            this.removeRow(row);
        }
    }
});
