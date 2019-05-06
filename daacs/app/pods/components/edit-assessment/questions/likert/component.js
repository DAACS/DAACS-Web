import Ember from 'ember';

const {
    get,
    set,
    tryInvoke
} = Ember;

export default Ember.Component.extend({
    actions: {
        openGroupDetails(group) {
            return tryInvoke(this.attrs, 'openEditLikertGroup', [group]);
        },

        addGroup() {
            return tryInvoke(this.attrs, 'openAddLikertGroup');
        },

        removeGroup(group) {
            get(this, 'model.itemGroups').removeObject(group);
            return group.deleteRecord();
        },

        reorderGroups(groups) {
            set(this, 'model.itemGroups', groups);
        },

        openQuestionDetails(question, group) {
            return tryInvoke(this.attrs, 'openEditLikertQuestion', [question, group]);
        },

        addQuestion(group) {
            return tryInvoke(this.attrs, 'openAddLikertQuestion', [group]);
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
            return tryInvoke(this.attrs, 'openImportLikertQuestions');
        }
    }
});
