import Ember from "ember";
import Authentication from "daacs/mixins/authentication";

export default Ember.Mixin.create(Authentication, {
    disableNext: true,
    minBrowserResolution: true,
    showProgressBar: Ember.computed(
        "minBrowserResolution",
        "assessmentContent.isWritingPrompt",
        function () {
            return (
                this.get("minBrowserResolution") &&
                !this.get("assessmentContent.isWritingPrompt")
            );
        }
    ),

    actions: {
        onNextClick() {},
    },
});
