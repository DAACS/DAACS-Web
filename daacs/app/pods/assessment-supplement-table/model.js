import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    completionScore: attr('string'),
    content: attr('feedback-content'),
    contentSummary: attr('feedback-content')
});
