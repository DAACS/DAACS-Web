import Ember from 'ember';

export function formatPercentage(params) {
    let value = params[0],
        decimalPlaces = params[1] || 0,
        percentage = (value * 100);

    percentage = (decimalPlaces === 0) ?
        Math.floor(percentage) :
        percentage.toFixed(decimalPlaces);

    return `${percentage}%`;
}

export default Ember.Helper.helper(formatPercentage);
