import Ember from 'ember';
import CatGroupTransitions, {TRANSITION_INFINITY, TRANSITION_NEG_INFINITY} from 'daacs/constants/assessment/cat-group-transitions';

const {
    get,
    set,
    setProperties,
    isBlank,
    computed,
    assign
} = Ember;

export default Ember.Component.extend({
    classNames: ['form-inline', 'margin-btm-20'],

    mapField: computed('groupTransition.transitionMap.{EASY,MEDIUM,HARD}', 'difficulty', function() {
        return get(this, `groupTransition.transitionMap.${get(this, 'difficulty')}`);
    }),

    difficultyType: computed('difficulty', function() {
        return CatGroupTransitions.findBy('groupDifficulty', get(this, 'difficulty'));
    }),

    parsedTransition: computed('mapField', function() {
        const transition = get(this, 'mapField');
        return this.deserializeTransition(transition);
    }),

    deserializeTransition(transition) {
        const parsed = {
            lowerValue: null,
            upperValue: null,
            lowerBoundType: '[',
            upperBoundType: ']'
        }

        if(!isBlank(transition)) {
            //api stores value in the format of: ([LOWER,UPPER]) (where "[]" vs "()" denotes the bound type)
            const parts = transition.split(',');
            const lowerPart = get(parts, 'firstObject');
            const upperPart = get(parts, 'lastObject');
            const lowerBoundType = lowerPart && lowerPart.substring(0, 1);
            const lowerValue = lowerPart && lowerPart.substring(1);
            const lowerValueIsInf = (lowerValue === TRANSITION_NEG_INFINITY);
            const upperBoundType = upperPart && upperPart.substring(upperPart.length - 1);
            const upperValue = upperPart && upperPart.substring(0, upperPart.length - 1);
            const upperValueIsInf = (upperValue === TRANSITION_INFINITY);
            setProperties(parsed, {
                lowerValue,
                upperValue,
                lowerValueIsInf,
                upperValueIsInf,
                lowerBoundType,
                upperBoundType
            });
        }

        return parsed;
    },

    serializeTransition(transition) {
        const lowerValue = get(transition, 'lowerValue') ? get(transition, 'lowerValue') : '';
        const upperValue = get(transition, 'upperValue') ? get(transition, 'upperValue') : '';
        const lowerBoundType = get(transition, 'lowerBoundType');
        const upperBoundType = get(transition, 'upperBoundType');
        return `${lowerBoundType}${lowerValue},${upperValue}${upperBoundType}`;
    },

    updateValue(value, edge) {
        const currentTransition = get(this, 'parsedTransition');
        const newTransition = assign({}, currentTransition, {[`${edge}Value`]: value});
        set(this, `groupTransition.transitionMap.${get(this, 'difficulty')}`, this.serializeTransition(newTransition));
    },

    updateBoundType(type, edge) {
        const currentTransition = get(this, 'parsedTransition');
        const newTransition = assign({}, currentTransition, {[`${edge}BoundType`]: type});
        set(this, `groupTransition.transitionMap.${get(this, 'difficulty')}`, this.serializeTransition(newTransition));
    },

    actions: {
        updateLowerValue(value) {
            return this.updateValue(value, 'lower');
        },

        updateUpperValue(value) {
            return this.updateValue(value, 'upper');
        },

        updateLowerBoundType(type) {
            return this.updateBoundType(type, 'lower');
        },

        updateUpperBoundType(type) {
            return this.updateBoundType(type, 'upper');
        },

        toggleLowerValueInf() {
            const currentTransition = get(this, 'parsedTransition');
            this.updateValue(get(currentTransition, 'lowerValueIsInf') ? '' : TRANSITION_NEG_INFINITY, 'lower');
            //infinity values must have an exclusive bound type
            this.updateBoundType('(', 'lower');
        },

        toggleUpperValueInf() {
            const currentTransition = get(this, 'parsedTransition');
            this.updateValue(get(currentTransition, 'upperValueIsInf') ? '' : TRANSITION_INFINITY, 'upper');
            //infinity values must have an exclusive bound type
            this.updateBoundType(')', 'upper');
        }
    }
});
