import Ember from 'ember';
import AssessmentGeneralController from 'daacs/pods/admin/manage-assessments/assessment/general/controller';

const {
    get,
    getProperties
} = Ember;

export default AssessmentGeneralController.extend({
    openLikerGroupModal(itemGroup, isNew = false) {
        const path = 'admin/manage-assessments/likert-group-modal';
        this.send('openModal', path, itemGroup, path, [get(this, 'model'), isNew]);
    },

    openLikertQuestionModal(item, itemGroup, isNew = false) {
        const path = 'admin/manage-assessments/likert-question-modal';
        this.send('openModal', path, item, path, [get(this, 'model'), itemGroup, isNew]);
    },

    openCatQuestionModal(item, itemGroup, isNew = false) {
        const path = 'admin/manage-assessments/cat-question-modal';
        this.send('openModal', path, item, path, [get(this, 'model'), itemGroup, isNew]);
    },

    actions: {
        openAddLikertGroup() {
            const itemGroup = get(this, 'store').createRecord('user-assessment-question-group', {});
            return this.openLikerGroupModal(itemGroup, true);
        },

        openEditLikertGroup(itemGroup) {
            return this.openLikerGroupModal(itemGroup);
        },

        openAddLikertQuestion(itemGroup) {
            const possibleItemAnswers = get(itemGroup, 'possibleItemAnswers').map(answer => {
                return get(this, 'store').createRecord('item-answer', getProperties(answer, ['content']))
            });
            const model = get(this, 'store').createRecord('question-group-item', {
                possibleItemAnswers,
                itemContent: get(this, 'store').createFragment('item-content')
            });

            return this.openLikertQuestionModal(model, itemGroup, true);
        },

        openEditLikertQuestion(item, itemGroup) {
            return this.openLikertQuestionModal(item, itemGroup);
        },

        openImportLikertQuestions() {
            const path = 'admin/manage-assessments/likert-import-modal';
            return this.send('openModal', path, get(this, 'model'), path);
        },

        openEditCatQuestion(item, itemGroup) {
            return this.openCatQuestionModal(item, itemGroup);
        },

        openAddCatQuestion(itemGroup) {
            const item = get(this, 'store').createRecord('question-group-item', {
                itemContent: get(this, 'store').createFragment('item-content')
            });

            return this.openCatQuestionModal(item, itemGroup, true);
        },

        openImportCatQuestions() {
            const path = 'admin/manage-assessments/cat-import-modal';
            return this.send('openModal', path, get(this, 'model'), path);
        }
    }
});
