import Ember from 'ember';
import moment from 'moment';

export function currentYear() {
    return moment().format('YYYY');
}

export default Ember.Helper.helper(currentYear);
