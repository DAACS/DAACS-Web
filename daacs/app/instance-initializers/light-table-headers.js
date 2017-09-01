import Ember from 'ember';
import BaseCell from 'ember-light-table/components/cells/base';
import BaseColumn from 'ember-light-table/components/columns/base';

const {
    on,
    run: { scheduleOnce },
    computed: { alias }
} = Ember;

export function initialize() {
    BaseCell.reopen({
        attributeBindings: ['style', 'headers'],
        headers: alias('column.headerElementId')
    });

    BaseColumn.reopen({
        onInsertElement: on('didInsertElement', function() {
            scheduleOnce('afterRender', this, function() {
                this.set('column.headerElementId', this.get('elementId'));
            });
        })
    });
}

export default {
  name: 'light-table-headers',
  initialize
};
