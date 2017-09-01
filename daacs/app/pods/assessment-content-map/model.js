import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    landing: attr('string'),
    start: attr('string'),
    startTips: attr('string'),
    helpLabel: attr('string'),
    help: attr('string')
});
