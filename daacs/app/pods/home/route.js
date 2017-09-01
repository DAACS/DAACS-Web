import Ember from 'ember';
import ScrollReset from 'daacs/mixins/scroll-reset';

export default Ember.Route.extend(ScrollReset, {
    resetController(controller, isExiting) {
        if(isExiting) {
            controller.set('samlAuthFailed', false);
        }
    }
});
