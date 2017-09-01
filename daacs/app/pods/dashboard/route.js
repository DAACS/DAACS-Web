import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import { translationMacro as t } from 'ember-i18n';
import { CanMixin } from 'ember-can';
import ScrollReset from 'daacs/mixins/scroll-reset';

export default AuthenticatedRoute.extend(CanMixin, ScrollReset, {
    advisor: Ember.inject.service(),
    titleToken: t('dashboard.label'),
    modelName: 'assessment-category-summary',
    // // We can turn this off here since there is no loading route. There is also an issue with serialization of shoebox html content - https://github.com/ember-fastboot/fastboot/pull/79
    // shouldLoadFromShoebox: false,
    model() {
        let query = {};
        let userId = this.get('advisor.selectedUserId');

        //only allow advisors/admins to specify a userId
        if(!Ember.isEmpty(userId) && this.can('assessments.selectUser')) {
            query.userId = userId;
        }

        return this.store.query('assessment-category-summary', query);
    },

    actions: {
        changeSelectedUser() {
            this.refresh();
            return false;
        }
    }
});
