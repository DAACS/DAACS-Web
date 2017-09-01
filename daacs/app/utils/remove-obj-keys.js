import Ember from 'ember';

export default function removeKeysFromObject(obj, keys, removeEmpties, currentPath = []) {
    if(!obj || typeof obj !== 'object') {
        return obj;
    }

    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            let propPath = currentPath.concat([prop]),
                dotPath = propPath.join('.');

            if(keys.indexOf(dotPath) !== -1 || (removeEmpties && obj[prop] === null)) {
                delete obj[prop];
            } else if(Ember.isArray(obj[prop])) {
                if(removeEmpties && obj[prop].length === 0) {
                    delete obj[prop];
                } else {
                    obj[prop].forEach((element) => removeKeysFromObject(element, keys, removeEmpties, propPath));
                }
            } else if(obj[prop] && typeof obj[prop] === 'object') {
                removeKeysFromObject(obj[prop], keys, removeEmpties, propPath);
            }
        }
    }

    return obj;
}
