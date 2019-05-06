import Ember from 'ember';

const {
    get,
    isBlank,
    String: {
        dasherize
    }
} = Ember;

export function dasherizeHelper(params) {
    const value = get(params, 'firstObject');
    return !isBlank(value) ? dasherize(value) : value;
}

export default Ember.Helper.helper(dasherizeHelper);
