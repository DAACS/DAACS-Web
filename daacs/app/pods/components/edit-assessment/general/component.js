import Ember from 'ember';
import AssessmentCategories from 'daacs/constants/assessment/categories';
import AssessmentTypes, { TYPE_WRITING_PROMPT } from 'daacs/constants/assessment/types';
import { STATUS_COMPLETED, STATUS_GRADED } from 'daacs/constants/assessment/statuses';
import { DEFAULT_SCORE_MAP } from 'daacs/constants/assessment/scores';
import { PREREQ_TYPE_ASSESSMENT } from 'daacs/constants/assessment/prereq-types';
import CatGroupTransitions from 'daacs/constants/assessment/cat-group-transitions';

const {
    A,
    get,
    set,
    setProperties,
    isNone,
    computed,
    computed: {
        sort
    },
    inject: {
        service
    }
} = Ember;

export default Ember.Component.extend({
    store: service(),
    categories: AssessmentCategories,
    types: AssessmentTypes,
    difficulties: CatGroupTransitions,

    sortedCategoryGroups: sort('categoryGroups', 'categoryGroupSorting'),
    categoryGroupSorting: ['label'],

    scoringTypes: computed('model.assessmentType', function() {
        const assessmentType = get(this, 'model.assessmentType');
        const typeInfo = AssessmentTypes.findBy('value', assessmentType);
        return typeInfo && get(typeInfo, 'scoringTypes');
    }),

    actions: {
        updateAssessmentType(newType) {
            set(this, 'model.assessmentType', newType);
            const curScoringType = get(this, 'model.scoringType');
            const newScoringTypes = get(this, 'scoringTypes');
            //update the scoring type based on the new assessment type
            if(newScoringTypes && get(newScoringTypes, 'length') === 1) {
                //the assessment type only has 1 valid scoring type, so just set the assessment's scoring type to that
                set(this, 'model.scoringType', get(newScoringTypes, 'firstObject.value'));
            } else if(!newScoringTypes || !newScoringTypes.includes(curScoringType)) {
                //no valid scoring types exist (i.e. no type is selected)
                //or the previously selected scoring type is not valid for the new assessment type, so null it out
                set(this, 'model.scoringType', null);
            }

            //writing prompt assessments cant have completion score maps
            if(newType === get(TYPE_WRITING_PROMPT, 'value')) {
                set(this, 'model.overallRubric.completionScoreMap', {});
                get(this, 'model.domains').forEach(domain => set(domain, 'rubric.completionScoreMap', {}));
            } else {
                if(isNone(get(this, 'model.overallRubric.completionScoreMap'))) {
                    const scoreMap = get(this, 'store').createFragment('completion-score-map', DEFAULT_SCORE_MAP);
                    set(this, 'model.overallRubric.completionScoreMap', scoreMap);
                }

                get(this, 'model.domains').forEach(domain => {
                    if(isNone(get(domain, 'rubric.completionScoreMap'))) {
                        const scoreMap = get(this, 'store').createFragment('completion-score-map', DEFAULT_SCORE_MAP);
                        set(domain, 'rubric.completionScoreMap', scoreMap);
                    }
                });
            }

            //CAT/Likert assessments need a value for numQuestionsPerGroup
            if(get(this, 'model.isMultipleChoiceLike') || get(this, 'model.isLikert')) {
                set(this, 'model.numQuestionsPerGroup', get(this, 'model.largestItemGroup.items.length') || 0);
            }
        },

        updateAssessmentCategory(newCategoryGroupId) {
            const model = get(this, 'model');
            const groups = get(this, 'categoryGroups');
            const newCategoryGroup = groups.findBy('id', newCategoryGroupId);
            setProperties(model, {
                assessmentCategoryGroup: newCategoryGroup,
                assessmentCategory: newCategoryGroup ? get(newCategoryGroup, 'assessmentCategory') : null
            });
        },

        addPrereq() {
            const oldPrereqs = get(this, 'model.prerequisites');
            const prereqs = oldPrereqs ? oldPrereqs.toArray() : A();
            prereqs.pushObject(get(this, 'store').createFragment('assessment-prerequisite', {
                assessmentCategory: null,
                prereqType: get(PREREQ_TYPE_ASSESSMENT, 'value'),
                statuses: A([get(STATUS_COMPLETED, 'value'), get(STATUS_GRADED, 'value')])
            }));
            set(this, 'model.prerequisites', prereqs);
        },

        removePrereq(prereq) {
            const prereqs = get(this, 'model.prerequisites').toArray();
            prereqs.removeObject(prereq);
            set(this, 'model.prerequisites', prereqs);
        }
    }
});
