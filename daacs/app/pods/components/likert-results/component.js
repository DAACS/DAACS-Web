import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['likert-results'],
    numAnswerCols: Ember.computed.alias('questionGroups.firstObject.items.firstObject.possibleItemAnswers.length')
});
