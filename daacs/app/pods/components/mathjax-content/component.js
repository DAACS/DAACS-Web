import Ember from 'ember';

const {
    isBlank,
    inject: { service }
} = Ember;

export default Ember.Component.extend({
    mathjax: service(),
    tagName: 'span',
    classNames: ['mathjax-content'],
    content: null,

    didRender() {
        this.get('element').innerHTML = this.get('content') || '';
        if(!isBlank(this.get('content'))) {
            this.get('mathjax').rerender();
        }
    }
});
