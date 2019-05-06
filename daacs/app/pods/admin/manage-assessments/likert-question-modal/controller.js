import Ember from 'ember';
import ModalDialog from 'daacs/mixins/modal-dialog';
import EmberValidations from 'ember-validations';

const {
    A,
    get,
    getWithDefault,
    set,
    setProperties,
    computed,
    isBlank
} = Ember;

export default Ember.Controller.extend(ModalDialog, EmberValidations, {
    validations: {
        'model.domainId': {presence: true},
        'model.question': {presence: true},
        'hasAnswerWithNoScore': {absence: {message: ' can\'t have blank point values'}}
    },

    hasAnswerWithNoScore: computed('model.possibleItemAnswers.@each.score', function() {
        return getWithDefault(this, 'model.possibleItemAnswers', A()).find(answer => isBlank(get(answer, 'score')));
    }),

    setupModal(assessment, itemGroup, isNew) {
        setProperties(this, {
            assessment,
            itemGroup,
            isNew
        });
    },

    actions: {
        save() {
            const model = get(this, 'model');

            if(get(this, 'isNew')) {
                get(this, 'itemGroup.items').pushObject(model);
                set(this, 'assessment.numQuestionsPerGroup', get(this, 'assessment.largestItemGroup.items.length'));
            }

            this.closeModal();
        },

        cancelAdd() {
            get(this, 'store').unloadRecord(get(this, 'model'));
            this.closeModal();
        }
    }
});
