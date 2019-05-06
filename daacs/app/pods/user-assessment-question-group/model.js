import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
    assessmentId: attr('string'),
    difficulty: attr('string'),
    items: hasMany('question-group-item'),
    possibleItemAnswers: hasMany('question-group-possible-answer')
});
