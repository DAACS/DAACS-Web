import Ember from 'ember';
import ModalDialog from 'daacs/mixins/modal-dialog';

const {
    A,
    get,
    set,
    getProperties,
    setProperties,
    isNone,
    isEmpty,
    tryInvoke,
    computed,
    computed: {
        equal
    },
    inject: {
        service
    }
} = Ember;

export default Ember.Controller.extend(ModalDialog, {
    store: service(),
    activeStepIndex: 0,
    selectedAssessment: null,
    selectedGroups: A(),
    assessments: A(),
    isFirstStep: equal('activeStepIndex', 0),
    isLastStep: equal('activeStepIndex', 1),

    likertAssessments: computed('assessments', function() {
        //return all likert assessments that have at least 1 group w/1 question
        //except for the current assessment
        return get(this, 'assessments')
            .rejectBy('id', get(this, 'model.id'))
            .filterBy('isLikert', true)
            .filter(a => !isNone(get(a, 'itemGroups').find(g => get(g, 'items.length') > 0)));
    }),

    stepIsInvalid: computed('isFirstStep', 'selectedAssessment', 'selectedGroups.[]', function() {
        return isEmpty(get(this, get(this, 'isFirstStep') ? 'selectedAssessment' : 'selectedGroups'));
    }),

    setupModal() {
        setProperties(this, {
            activeStepIndex: 0,
            selectedAssessment: null,
            selectedGroups: A()
        });

        this.loadAssessments();
    },

    async loadAssessments() {
        set(this, 'isLoading', true);
        try {
            const assessments = await get(this, 'store').findAll('assessment', {reload: true});
            setProperties(this, {
                assessments,
                isLoading: false
            });
        } catch(error) {
            setProperties(this, {
                assessments: A(),
                isLoading: false
            });
        }
    },

    save() {
        const newGroups = get(this, 'selectedGroups').map(group => {
            return get(this, 'store').createRecord('user-assessment-question-group', {
                assessmentId: get(this, 'model.id'),
                possibleItemAnswers: get(group, 'possibleItemAnswers').map(a => {
                    return get(this, 'store').createRecord('question-group-possible-answer', getProperties(a, ['content']));
                }),
                items: get(group, 'items').map(item => {
                    const domain = get(this, 'model.domains').findBy('id', get(item, 'domainId'));
                    return get(this, 'store').createRecord('question-group-item', {
                        domainId: domain ? get(domain, 'id') : null,
                        question: get(item, 'question'),
                        itemContent: get(item, 'itemContent') ? get(item, 'itemContent').toJSON() : null,
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
        previousStep() {
            this.decrementProperty('activeStepIndex');
        },

        nextStep() {
            if(get(this, 'isLastStep')) {
                return this.save();
            } else {
                this.incrementProperty('activeStepIndex');
            }
        },

        selectAssessment(assessment) {
            setProperties(this, {
                selectedAssessment: assessment,
                selectedGroups: A()
            });
        },

        toggleGroup(itemGroup) {
            const selectedGroups = get(this, 'selectedGroups');
            const isSelected = selectedGroups.includes(itemGroup);
            tryInvoke(selectedGroups, isSelected ? 'removeObject' : 'pushObject', [itemGroup]);
        }
    }
});
