import Ember from 'ember';

const {
    get,
    set,
    tryInvoke,
    inject: {
        service
    }
} = Ember;

export default Ember.Component.extend({
    store: service(),

    actions: {
        addGroup(difficulty) {
            const model = get(this, 'store').createRecord('user-assessment-question-group', {difficulty});
            get(this, 'model.itemGroups').pushObject(model);
        },

        removeGroup(group) {
            get(this, 'model.itemGroups').removeObject(group);
            return group.deleteRecord();
        },

        reorderGroups(groups) {
            set(this, 'model.itemGroups', groups);
        },

        openQuestionDetails(question, group) {
            return tryInvoke(this.attrs, 'openEditCatQuestion', [question, group]);
        },

        addQuestion(group) {
            return tryInvoke(this.attrs, 'openAddCatQuestion', [group]);
        },

        removeQuestion(group, question) {
            get(group, 'items').removeObject(question);
            set(this, 'model.numQuestionsPerGroup', get(this, 'model.largestItemGroup.items.length'));
            return question.deleteRecord();
        },

        reorderQuestions(itemGroup, questions) {
            set(itemGroup, 'items', questions);
        },

        importQuestions() {
            return tryInvoke(this.attrs, 'openImportCatQuestions');
        }
    }
});
