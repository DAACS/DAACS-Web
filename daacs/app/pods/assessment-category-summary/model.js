import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    //attributes
    assessmentCategory: attr('string'),
    userHasTakenCategory: attr('boolean'),

    //relationships
    enabledAssessmentSummary: belongsTo('assessment-summary'),
    latestUserAssessmentSummary: belongsTo('user-assessment-summary')
});
