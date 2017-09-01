import { CanMixin } from 'ember-can';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import ScrollReset from 'daacs/mixins/scroll-reset';
import UserAssessmentRoute from 'daacs/mixins/user-assessment-route';

export default AuthenticatedRoute.extend(CanMixin, ScrollReset, UserAssessmentRoute, {
    titleToken(model) {
        return model.get('assessmentLabel');
    },

    resetController(controller, isExiting) {
        this._super(...arguments);
        if(isExiting) {
            controller.setProperties({finished: false});
        }
    },

    actions: {
        refreshRoute() {
            this.refresh();
        }
    }
});
