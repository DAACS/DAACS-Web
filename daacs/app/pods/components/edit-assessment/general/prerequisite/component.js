import Ember from 'ember';
import AssessmentCategories from 'daacs/constants/assessment/categories';
import AssessmentStatuses from 'daacs/constants/assessment/statuses';

const {
    get,
    set,
    tryInvoke,
    isBlank
} = Ember;

export default Ember.Component.extend({
    categories: AssessmentCategories,
    statuses: AssessmentStatuses,

    actions: {
        updateCategory(category) {
            set(this, 'model.assessmentCategory', isBlank(category) ? null : category);
        },

        toggleStatus(status) {
            const statuses = get(this, 'model.statuses').toArray();
            tryInvoke(statuses, statuses.includes(status) ? 'removeObject' : 'pushObject', [status]);
            set(this, 'model.statuses', statuses);
        },

        removePrereq() {
            return tryInvoke(this.attrs, 'remove', [get(this, 'model')]);
        }
    }
});
