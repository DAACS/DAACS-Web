import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModalDialog from 'daacs/mixins/modal-dialog';

const {
    A,
    get,
    set,
    setProperties,
    computed,
    isBlank,
    computed: {
        or,
        gte
    }
} = Ember;

export default Ember.Controller.extend(ModalDialog, EmberValidations, {
    newAnswer: null,
    atMaxAnswers: gte('answers.length', 5),

    blankAnswer: computed('newAnswer', function() {
        return isBlank(get(this, 'newAnswer'));
    }),

    cannotAddAnswers: or('blankAnswer', 'atMaxAnswers'),

    setupModal(assessment, isNew) {
        const answers = get(this, 'model.possibleItemAnswers').toArray();
        setProperties(this, {
            newAnswer: null,
            assessment,
            answers,
            isNew
        });
    },

    actions: {
        save() {
            const model = get(this, 'model');
            const groupAnswers = get(this, 'answers');
            set(model, 'possibleItemAnswers', groupAnswers);
            if(get(this, 'isNew')) {
                get(this, 'assessment.itemGroups').pushObject(model);
            } else {
                //apply current group answers to all existing questions in group
                get(model, 'items').forEach(item => {
                    const itemAnswers = get(item, 'possibleItemAnswers');
                    const newItemAnswers = A();

                    groupAnswers.forEach(groupAnswer => {
                        const content = get(groupAnswer, 'content');
                        let currentAnswer = itemAnswers.findBy('content', content);
                        if(!currentAnswer) {
                            currentAnswer = get(this, 'store').createRecord('item-answer', {
                                content,
                                score: 0
                            });
                        }

                        newItemAnswers.pushObject(currentAnswer);
                    });

                    set(item, 'possibleItemAnswers', newItemAnswers);
                });
            }

            this.closeModal();
        },

        cancelAdd() {
            get(this, 'store').unloadRecord(get(this, 'model'));
            this.closeModal();
        },

        reorderAnswers(answers) {
            set(this, 'answers', answers);
        },

        addAnswer() {
            const answer = get(this, 'store').createRecord('question-group-possible-answer', {
                content: get(this, 'newAnswer').trim()
            });
            get(this, 'answers').pushObject(answer);
            set(this, 'newAnswer', null);
        },

        removeAnswer(answer) {
            get(this, 'answers').removeObject(answer);
        }
    }
});
