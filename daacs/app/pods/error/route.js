import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';
import ScrollReset from 'daacs/mixins/scroll-reset';

export default Ember.Route.extend(ScrollReset, {
    titleToken: t('serverError.title'),

    setupController(controller, errorInfo) {
        controller.set('errorInfo', errorInfo);
        this._super(...arguments);
    }
});
