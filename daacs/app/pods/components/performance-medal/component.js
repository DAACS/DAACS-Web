import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),
    classNames: ['performance-medal'],
    classNameBindings: ['hasRibbon', 'small', 'inline'],
    attributeBindings: ['title'],
    hasRibbon: true,
    //bronze|silver|gold
    type: 'bronze',
    bronzeLabel: t('assessment.performance.low'),
    silverLabel: t('assessment.performance.medium'),
    goldLabel: t('assessment.performance.high'),

    title: Ember.computed('type', function() {
        return this.get(`${this.get('type')}Label`);
    })
});
