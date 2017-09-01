import Ember from 'ember';
import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';
import CheckAbilities from 'daacs/mixins/check-abilities';
import ScrollReset from 'daacs/mixins/scroll-reset';
import { translationMacro as t } from 'ember-i18n';

export default AuthenticatedRoute.extend(CheckAbilities, ScrollReset, {
    abilitiesRequired: ['admin.view'],
    titleToken: t('admin.manageAssessments'),

    async model() {
        let models = await Ember.RSVP.hash({
            assessments: this.store.findAll('assessment', {reload: true}),
            stats: this.store.findAll('assessment-stat-summary', {reload: true})
        });

        models.assessments = models.assessments.map((assessment) => {
            let numCompletions = 0,
                statsSummary = models.stats.findBy('id', assessment.get('id'));

            if(statsSummary && !Ember.isEmpty(statsSummary.get('stat'))) {
                numCompletions = statsSummary.get('stat').reduce((prevValue, stat) => {
                    if(stat.get('completionStatus') !== 'IN_PROGRESS') {
                        return prevValue + stat.get('count');
                    }

                    return prevValue;
                }, 0);
            }

            assessment.set('numCompletions', numCompletions);
            return assessment;
        });

        return models.assessments;
    }
});
