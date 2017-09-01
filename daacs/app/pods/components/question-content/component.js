import Ember from 'ember';

const contentTypes = {
    WORD: 'question-content-word',
    FORMULA: 'question-content-formula',
    PASSAGE: 'question-content-passage'
};

export default Ember.Component.extend({
    classNames: ['question-content'],
    itemContent: null,

    contentCmp: Ember.computed('itemContent.itemContentType', function() {
        return contentTypes[this.get('itemContent.itemContentType')];
    })
});
