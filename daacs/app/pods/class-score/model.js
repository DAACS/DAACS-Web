import Model from 'ember-data/model';
import Ember from 'ember';
import attr from 'ember-data/attr';
import { fragmentArray } from 'model-fragments/attributes';

const {
    computed
} = Ember;

export default Model.extend({
    classInviteAccepted: attr('boolean'),
    studentFirstName: attr('string'),
    studentLastName: attr('string'),
    studentEmail: attr('string'),
    //relationships
    assessmentScores: fragmentArray('assessment-score'),

    //computeds
    fullName: computed('studentFirstName', 'studentLastName', function() {
        return `${this.get('studentLastName')}, ${this.get('studentFirstName')}`;
    })
});
