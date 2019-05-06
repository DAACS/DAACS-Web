import Ember from 'ember';
import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';
import Scores from 'daacs/constants/assessment/scores';

const {
    get,
    computed
} = Ember;

export default Fragment.extend({
    //attributes
    completionScore: attr('string'),
    content: attr('feedback-content'),
    contentSummary: attr('feedback-content'),

    //computeds
    scoreType: computed('completionScore', function() {
        return Scores.findBy('value', get(this, 'completionScore'));
    })
});
