import Ember from 'ember';

const {
    isBlank,
    computed,
    get
} = Ember;

export default function formattedScore(dependentKey) {
    return computed(dependentKey, function() {
        const value = get(this, dependentKey);
        if(!isBlank(value)) {
            const parts = value.replace(/[\[\]\(\)]/g, '').split(',');
            return `${get(parts, 'firstObject')} - ${get(parts, 'lastObject')}`;
        }
    });
}
