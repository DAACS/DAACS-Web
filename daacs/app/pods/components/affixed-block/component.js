import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['affixed-block'],
    topOffsetAdjustment: -20,
    bottomOffsetAdjustment: 20,
    affixedMedias: ['desktop', 'jumbo'],

    destroyAffix() {
        let element = this.$();
        element.removeData('bs.affix');
        element.removeClass('affix affix-top affix-bottom');
        element.css('width', '');
        Ember.$(window).off('.affix');
    },

    initAffix() {
        let element = this.$(),
            offset = element.offset();

        //make the element's width static so that is preserved when its positioning is changed
        element.css('width', `${element.outerWidth()}px`);

        element.affix({
            target: this.getWithDefault('targetElement', window),
            offset: {
                top: offset.top + this.get('topOffsetAdjustment'),
                bottom: Ember.$('.footer:first').outerHeight() + this.get('bottomOffsetAdjustment')
            }
        });
    },

    shouldInitAffix() {
        let medias = this.get('affixedMedias');

        for(let i=0; i<medias.length; i++) {
            if(this.get(`media.is${Ember.String.capitalize(medias[i])}`)) {
                return true;
            }
        }

        return false;
    },

    onMediaChange: Ember.observer('media.isMobile', 'media.isTablet', 'media.isDesktop', 'media.isJumbo', function() {
        this.destroyAffix();

        if(this.shouldInitAffix()) {
            this.initAffix();
        }
    }),

    onInsertElement: Ember.on('didInsertElement', function() {
        if(this.shouldInitAffix()) {
            this.initAffix();
        }
    }),

    onDestroyElement: Ember.on('willDestroyElement', function() {
        this.destroyAffix();
    })
});
