import Ember from 'ember';
import { lowerCase as lowerCaseHelper } from 'daacs/helpers/lower-case';

const {
    computed,
    get
} = Ember;

export default function lowerCase(dependentKey) {
    return computed(dependentKey, function() {
        const value = get(this, dependentKey);
        return lowerCaseHelper([value]);
    });
}
