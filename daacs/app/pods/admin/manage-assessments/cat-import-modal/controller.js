import Ember from 'ember';
import LikertImportModal from 'daacs/pods/admin/manage-assessments/likert-import-modal/controller';
import CatTransitions from 'daacs/constants/assessment/cat-group-transitions';

const {
    get,
    set,
    getProperties,
    isNone,
    computed
} = Ember;

export default LikertImportModal.extend({
    catTransitions: CatTransitions,

    catAssessments: computed('assessments', function() {
        //return all multiple choice-like assessments that have at least 1 group w/1 question
        //except for the current assessment
        return get(this, 'assessments')
            .rejectBy('id', get(this, 'model.id'))
            .filterBy('isMultipleChoiceLike', true)
            .filter(a => !isNone(get(a, 'itemGroups').find(g => get(g, 'items.length') > 0)));
    }),

    save() {
        const isCat = get(this, 'model.isCat');
        const newGroups = get(this, 'selectedGroups').map(group => {
            return get(this, 'store').createRecord('user-assessment-question-group', {
                assessmentId: get(this, 'model.id'),
                difficulty: isCat ? get(group, 'selectedGroupDifficulty') : null,
                items: get(group, 'items').map(item => {
                    const domain = get(this, 'model.domains').findBy('id', get(item, 'domainId'));
                    return get(this, 'store').createRecord('question-group-item', {
                        domainId: domain ? get(domain, 'id') : null,
                        question: get(item, 'question'),
                        itemContent: get(item, 'itemContent').toJSON(),
                        possibleItemAnswers: get(item, 'possibleItemAnswers').map(answer => {
                            return get(this, 'store').createRecord('item-answer', getProperties(answer, ['content', 'score']))
                        })
                    });
                })
            });
        });

        get(this, 'model.itemGroups').pushObjects(newGroups);
        set(this, 'model.numQuestionsPerGroup', get(this, 'model.largestItemGroup.items.length'));
        this.closeModal();
    },

    actions: {
        updateGroupDifficulty(group, difficulty) {
            set(group, 'selectedGroupDifficulty', difficulty);
        },

        selectAssessment(assessment) {
            this._super(...arguments);
            //store a temp copy of each group's difficulty, so that it can be modified
            //for the imported groups, w/o affecting the original group's difficulty
            get(assessment, 'itemGroups').forEach(group => set(group, 'selectedGroupDifficulty', get(group, 'difficulty')));
        }
    }
});
