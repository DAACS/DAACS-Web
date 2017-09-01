import Ember from 'ember';
import { trim } from 'daacs/helpers/trim';

export default Ember.Component.extend({
    classNames: ['truncate-text'],
    isTruncated: true,
    numChars: 700,
    ellipsisText: '...',
    allowTruncation: true,
    lineWrapTagName: null,

    textWithWrappedLines: Ember.computed('truncatedText', 'lineWrapTagName', function() {
        const tagName = this.get('lineWrapTagName');

        if(!tagName) {
            return this.get('truncatedText');
        }

        return `<${tagName}>${this.get('truncatedText').split("\n").join(`</${tagName}>\n<${tagName}>`)}</${tagName}>`;
    }),

    needsTruncation: Ember.computed('allowTruncation', 'text', 'numChars', function() {
        return this.get('allowTruncation') && this.get('text').length > this.get('numChars');
    }),

    truncatedText: Ember.computed('text', 'isTruncated', 'needsTruncation', 'numChars', 'ellipsisText', function() {
        let content = trim(this.get('text'));

        if(this.get('needsTruncation') && this.get('isTruncated')) {
            content = trim(content.substr(0, this.get('numChars')));
            content += this.get('ellipsisText');
        }

        return content;
    }),

    actions: {
        toggle() {
            this.toggleProperty('isTruncated');
        }
    }
});
