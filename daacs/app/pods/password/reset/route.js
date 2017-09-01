import Ember from 'ember';
import ScrollReset from 'daacs/mixins/scroll-reset';
import { translationMacro as t } from 'ember-i18n';

export default Ember.Route.extend(ScrollReset, {
    titleToken: t('password.resetHeading'),

    resetController(controller, isExiting) {
        if(isExiting) {
            controller.setProperties({
                password: null,
                passwordConfirmation: null,
                submitError: null,
                code: null,
                id: null
            });
        }
    }
});
