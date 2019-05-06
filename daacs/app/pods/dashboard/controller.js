import Ember from 'ember';
import Config from 'daacs/config/environment';

const {
    computed,
    isEmpty,
    inject: { service }
} = Ember;

export default Ember.Controller.extend({
    fastboot: service(),
    categoryOrder: Config.dashboardCategoryOrder,

    sortedSummaries: computed('model.@each.assessmentCategory', 'categoryOrder.[]', function() {
        const summaries = Ember.A();
        this.get('categoryOrder').forEach((category) => {
            let catSummaries = this.get('model').filterBy('assessmentCategory', category);
            if(!isEmpty(catSummaries)) {
                summaries.pushObjects(catSummaries);
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
