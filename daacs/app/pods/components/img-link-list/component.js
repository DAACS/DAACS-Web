import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'span',
    hasMultipleImages: Ember.computed.gt('images', 0),

    actions: {
        onLinkClick(imgSrc) {
            if(this.attrs.onLinkClick) {
                this.attrs.onLinkClick(imgSrc);
            }
        }
    }
});
