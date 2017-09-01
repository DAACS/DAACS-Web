import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { fragmentArray } from 'model-fragments/attributes';
import { trim } from 'daacs/helpers/trim';

export default Model.extend({
    username: attr('string'),
    password: attr('string'),
    passwordConfirm: attr('string'),
    firstName: attr('string'),
    lastName: attr('string'),
    role: attr('string'),
    enabled: attr('boolean'),
    hasDataUsageConsent: attr(),
    accountNonExpired: attr('boolean'),
    accountNonLocked: attr('boolean'),
    authorities: fragmentArray('user-authorities'),

    passwordConfirmation: Ember.computed.alias('passwordConfirm'),

    isStudent: Ember.computed('authorities', function() {
        return !Ember.isEmpty(this.get('authorities').findBy('authority', 'ROLE_STUDENT'));
    }),

    isAdvisor: Ember.computed('authorities', function() {
        return !Ember.isEmpty(this.get('authorities').findBy('authority', 'ROLE_ADVISOR'));
    }),

    isAdmin: Ember.computed('authorities', function() {
        return !Ember.isEmpty(this.get('authorities').findBy('authority', 'ROLE_ADMIN'));
    }),

    fullName: Ember.computed('firstName', 'lastName', function() {
        return trim(`${this.get('firstName') || ''} ${this.get('lastName') || ''}`);
    })
});
