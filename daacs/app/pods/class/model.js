import Model from 'ember-data/model';
import { fragmentArray } from 'model-fragments/attributes';
import attr from 'ember-data/attr';

export default Model.extend({
    name: attr('string'),
    instructorId: attr('string'),
    canEditAssessments: attr('boolean', { defaultValue: true }),

    //relationships
    assessmentIds: attr(),
    studentInvites: fragmentArray('student-invite')
});
