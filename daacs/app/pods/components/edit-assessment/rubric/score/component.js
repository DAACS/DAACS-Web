import Ember from 'ember';

const {
    get,
    set,
    setProperties,
    isBlank,
    computed,
    assign
} = Ember;

export default Ember.Component.extend({
    score: computed('scoreMap.{LOW,MEDIUM,HIGH}', 'scoreType.value', function() {
        return get(this, `scoreMap.${get(this, 'scoreType.value')}`);
    }),

    parsedScore: computed('score', function() {
        const score = get(this, 'score');
        return this.deserializeScore(score);
    }),

    deserializeScore(score) {
        const parsed = {
            lowerValue: null,
            upperValue: null,
            lowerBoundType: '[',
            upperBoundType: ']'
        }

        if(!isBlank(score)) {
            //api stores value in the format of: ([LOWER,UPPER]) (where "[]" vs "()" denotes the bound type)
            const parts = score.split(',');
            const lowerPart = get(parts, 'firstObject');
            const upperPart = get(parts, 'lastObject');
            const lowerBoundType = lowerPart && lowerPart.substring(0, 1);
            const lowerValue = lowerPart && lowerPart.substring(1);
            const upperBoundType = upperPart && upperPart.substring(upperPart.length - 1);
            const upperValue = upperPart && upperPart.substring(0, upperPart.length - 1);
            setProperties(parsed, {
                lowerValue,
                upperValue,
                lowerBoundType,
                upperBoundType
            });
        }

        return parsed;
    },

    serializeScore(score) {
        const lowerValue = get(score, 'lowerValue') ? get(score, 'lowerValue') : '';
        const upperValue = get(score, 'upperValue') ? get(score, 'upperValue') : '';
        const lowerBoundType = get(score, 'lowerBoundType');
        const upperBoundType = get(score, 'upperBoundType');
        return `${lowerBoundType}${lowerValue},${upperValue}${upperBoundType}`;
    },

    updateValue(value, edge) {
        const currentScore = get(this, 'parsedScore');
        const newScore = assign({}, currentScore, {[`${edge}Value`]: value});
        set(this, `scoreMap.${get(this, 'scoreType.value')}`, this.serializeScore(newScore));
    },

    updateBoundType(type, edge) {
        const currentScore = get(this, 'parsedScore');
        const newScore = assign({}, currentScore, {[`${edge}BoundType`]: type});
        set(this, `scoreMap.${get(this, 'scoreType.value')}`, this.serializeScore(newScore));
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
        }
    }
});
