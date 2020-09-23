import Ember from 'ember';
import ScrollReset from 'daacs/mixins/scroll-reset';
import { translationMacro as t } from 'ember-i18n';

export default Ember.Route.extend(ScrollReset, {
    titleToken: t('classes.classInvite.title'),

    resetController(controller, isExiting) {
        this._super(...arguments);
        if(isExiting) {
            controller.setProperties({
                submitError: null,
                classId: null,
                userId: null
            });
        }
    }
});
