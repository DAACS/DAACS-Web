import Ember from 'ember';

export function lowerCase(params) {
    if (params[0]) {
        return params[0].toLowerCase();
    }
}

export default Ember.Helper.helper(lowerCase);
