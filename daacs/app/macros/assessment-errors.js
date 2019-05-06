import Ember from 'ember';
import * as errorPaths from 'daacs/constants/assessment/errors';

const {
    computed,
    get
} = Ember;

export default function assessmentErrors(errorsKey, type) {
    return computed(`${errorsKey}.@each.code`, function() {
        const errors = get(this, errorsKey);
        const paths = get(errorPaths, `${type.toUpperCase()}_ERROR_PATHS`);
        const pathPrefix = 'serverError.codes';
        return errors.filter(err => {
            //if the error's "code" path starts with one of the type's defined paths, include it
            for(let path of paths) {
                //escape regex special characters in the path
                const regexPath = `${pathPrefix}.${path}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                if(RegExp(`^${regexPath}`).test(get(err, 'code'))) {
                    return true;
                }
            }

            return false;
        });
    });
}
