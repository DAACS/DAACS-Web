import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { fragment } from 'model-fragments/attributes';

const imgRegex = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g;

export default Model.extend({
    chosenItemAnswer: belongsTo('item-answer'),
    chosenItemAnswerId: attr('string'),
    completeDate: attr('date'),
    domainId: attr('string'),
    itemContent: fragment('item-content'),
    possibleItemAnswers: hasMany('item-answer'),
    question: attr('string'),
    startDate: attr('date'),
    questionNoImages: Ember.computed('question', function() {
        return this.get('question').replace(imgRegex, '');
    })
});
