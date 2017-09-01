import Ember from 'ember';

export function trim(params) {
    let str = Ember.isArray(params) ? params[0] : params;
    Ember.assert('First parameter or argument must be a string', (typeof str === 'string'));
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

export default Ember.Helper.helper(trim);
