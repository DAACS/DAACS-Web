import Ember from 'ember';
import { lowerCase } from 'daacs/helpers/lower-case';

const {
    isEmpty,
    computed,
    get,
    String: { dasherize }
} = Ember;

export default function dasherized(dependentKey) {
    return computed(dependentKey, function() {
        const value = get(this, dependentKey);
        return !isEmpty(value) ? dasherize(lowerCase([value])) : '';
    });
}
