import Fragment from 'model-fragments/fragment';
import { fragment, fragmentArray } from 'model-fragments/attributes';

export default Fragment.extend({
    completionScoreMap: fragment('completion-score-map'),
    supplementTable: fragmentArray('assessment-supplement-table')
});
