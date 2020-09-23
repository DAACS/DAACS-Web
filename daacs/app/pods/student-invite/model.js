import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    studentId: attr('string'),
    inviteStatusAccepted: attr('boolean')
});
