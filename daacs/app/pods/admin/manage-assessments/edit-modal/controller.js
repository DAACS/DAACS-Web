import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ModalDialog from 'daacs/mixins/modal-dialog';

export default Ember.Controller.extend(EmberValidations, ModalDialog, {
    notify: Ember.inject.service(),

    validations: {
        'assessmentContentLanding': {presence: true},
        'assessmentContentStart': {presence: true},
        'assessmentContentStartTips': {presence: true},
        'assessmentContentHelpLabel': {presence: true},
        'assessmentContentHelp': {presence: true},
        'overallRubricLOW': {presence: true},
        'overallRubricMEDIUM': {presence: true},
        'overallRubricHIGH': {presence: true},
        'writingPrompt.content': {
            presence: {
                'if'(object) {
                    //only validate the writing prompt content if this is a WRITING type assessment
                    return object.get('model.isWritingPrompt');
                }
            }
        }
    },

    assessmentContentLanding: Ember.computed.alias('model.content.landing'),
    assessmentContentStart: Ember.computed.alias('model.content.start'),
    assessmentContentStartTips: Ember.computed.alias('model.content.startTips'),
    assessmentContentHelpLabel: Ember.computed.alias('model.content.helpLabel'),
    assessmentContentHelp: Ember.computed.alias('model.content.help'),
    writingPrompt: Ember.computed.alias('model.writingPrompt.content'),

    overallRubricLOW: Ember.computed('model.overallRubric.supplementTable.@each.content', function() {
        let table = this.get('model.overallRubric.supplementTable');
        return table ? table.findBy('completionScore', 'LOW').get('content') : '';
    }),

    overallRubricMEDIUM: Ember.computed('model.overallRubric.supplementTable.@each.content', function() {
        let table = this.get('model.overallRubric.supplementTable');
        return table ? table.findBy('completionScore', 'MEDIUM').get('content') : '';
    }),

    overallRubricHIGH: Ember.computed('model.overallRubric.supplementTable.@each.content', function() {
        let table = this.get('model.overallRubric.supplementTable');
        return table ? table.findBy('completionScore', 'HIGH').get('content') : '';
    }),

    reset() {
        this.get('model').rollbackAttributes();
        //since rolling back dirty attributes on the parent model doesn't propagate to nested models
        //we need to invoke it individually on each nested model as well
        this.get('model.domains').invoke('rollbackAttributes');
        this.get('model.itemGroups').forEach((itemGroup) => {
            itemGroup.get('items').forEach((item) => {
                item.rollbackAttributes();
                item.get('possibleItemAnswers').invoke('rollbackAttributes');
            });
        });
    },

    showSubmitError() {
        this.get('notify').error(this.get('i18n').t('admin.editAssessment.submitError'));
    },

    async save() {
        try {
            let result = await this.get('model').save();
            this.get('notify').success(this.get('i18n').t('admin.editAssessment.submitSuccess'));
            this.closeModal();
            this.send('refreshRoute');
            return result;
        } catch(error) {
            this.showSubmitError();
            return Ember.RSVP.reject(error);
        }
    },

    actions: {
        cancel() {
            this.reset();
            this._super(...arguments);
        },

        save() {
            return this.save();
        },

        submitError() {
            this.showSubmitError();
        }
    }
});
