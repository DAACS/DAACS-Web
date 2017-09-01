import Ember from 'ember';
import Config from 'daacs/config/environment';

const {
    computed,
    inject: { service }
} = Ember;

export default Ember.Controller.extend({
    fastboot: service(),
    categoryOrder: Config.dashboardCategoryOrder,

    sortedSummaries: computed('model.@each.id', 'categoryOrder.[]', function() {
        const summaries = Ember.A();
        this.get('categoryOrder').forEach((category) => {
            let summary = this.get('model').findBy('id', category);
            if(summary) {
                summaries.pushObject(summary);
            }
        });

        return summaries;
    }),

    assessmentRows: computed('sortedSummaries.[]', function() {
        const numPerRow = 4;
        let rows = Ember.A(),
            currentRow = Ember.A(),
            counter = 0;

        this.get('sortedSummaries').forEach((assessmentSummary) => {
            currentRow.pushObject(assessmentSummary);
            counter++;

            if(counter === numPerRow) {
                rows.pushObject(currentRow);
                currentRow = Ember.A();
                counter = 0;
            }
        });

        if(currentRow.get('length') > 0) {
            rows.pushObject(currentRow);
        }

        return rows;
    })
});
