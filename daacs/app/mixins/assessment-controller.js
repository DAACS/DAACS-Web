import Ember from 'ember';
import Authentication from 'daacs/mixins/authentication';

export default Ember.Mixin.create(Authentication, {
    disableNext: true,
    minBrowserResolution: Ember.computed.or('media.isDesktop', 'media.isJumbo'),
    showProgressBar: Ember.computed('minBrowserResolution', 'assessmentContent.isWritingPrompt', function() {
        return this.get('minBrowserResolution') && !this.get('assessmentContent.isWritingPrompt');
    }),

    actions: {
        onNextClick() {}
    }
});
