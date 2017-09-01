import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['question-content-passage'],
    truncateContent: false,
    //wrap every line in a <span></span> so that they can be counted for line numbering
    //using new lines as the delimiter, but preserve the new lines so breaks can be rendered
    lineWrapTagName: 'span'
});
