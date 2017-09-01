import Ember from 'ember';
import { computed } from 'ember-can';

export default Ember.Component.extend({
    fastboot: Ember.inject.service(),
    classNames: ['assessment-action-button'],
    i18n: Ember.inject.service(),
    ability: computed.ability('assessments'),
    canTake: Ember.computed.alias('ability.take'),
    disableStart: Ember.computed('canStart', 'canTake', function() {
        return !this.get('canStart') || !this.get('canTake');
    }),

    progressLinkRoute: Ember.computed('canTake', function() {
        return this.get('canTake') ? 'assessments.take' : 'assessments.index';
    }),

    startLinkRoute: Ember.computed('canTake', function() {
        return this.get('canTake') ? 'assessments.start' : 'assessments.index';
    }),

    progressText: Ember.computed('canTake', function() {
        return this.get('i18n').t(this.get('canTake') ? 'assessment.continue' : 'assessment.inProgress');
    }),

    startText: Ember.computed('canTake', 'media.isTablet', function() {
        return this.get('i18n').t(this.get('canTake') ?
            (this.get('media.isTablet') ? 'assessment.start' : 'assessment.startAssessment') :
            'assessment.notStarted'
        );
    }),

    disabledReasonsTitle: Ember.computed('disabledReasons', 'canStart', function() {
        const reasons = this.get('disabledReasons');
        return (!this.get('canStart') && Ember.isArray(reasons)) ? reasons.join("\n") : null;
    }),

    hasActivePrereqs: Ember.computed.notEmpty('disabledReasonsTitle')
});
