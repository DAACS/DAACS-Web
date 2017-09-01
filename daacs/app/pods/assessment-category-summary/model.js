import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    userHasTakenCategory: attr('boolean'),
    enabledAssessmentSummary: belongsTo('assessment-summary'),
    latestUserAssessmentSummary: belongsTo('user-assessment-summary')
});
