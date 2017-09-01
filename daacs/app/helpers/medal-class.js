import Ember from 'ember';

const MEDAL_CLASSES = {
    LOW: 'bronze',
    MEDIUM: 'silver',
    HIGH: 'gold'
};

export function medalClass(params) {
    return MEDAL_CLASSES[params[0]] || '';
}

export default Ember.Helper.helper(medalClass);
