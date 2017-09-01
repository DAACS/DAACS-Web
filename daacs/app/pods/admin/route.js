import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import { translationMacro as t } from 'ember-i18n';

export default AuthenticatedRoute.extend(CheckAbilities, {
    abilitiesRequired: ['admin.view'],
    titleToken: t('admin.label')
});
