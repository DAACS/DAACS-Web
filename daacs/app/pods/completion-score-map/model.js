import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';
import formattedScore from 'daacs/macros/formatted-score';

export default Fragment.extend({
    //attributes
    HIGH: attr('string'),
    LOW: attr('string'),
    MEDIUM: attr('string'),

    //computeds
    highFormatted: formattedScore('HIGH'),
    lowFormatted: formattedScore('LOW'),
    mediumFormatted: formattedScore('MEDIUM')
});
