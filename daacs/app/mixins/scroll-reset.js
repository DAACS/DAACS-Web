import Ember from 'ember';

export default Ember.Mixin.create({
    fastboot: Ember.inject.service(),
    activate() {
        this._super();
        if (!this.get('fastboot.isFastBoot')) {
            this.resetScroll();
        }
    },
    resetScroll() {
        window.scrollTo(0,0);
    }
});
