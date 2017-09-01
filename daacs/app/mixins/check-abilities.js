import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Mixin.create(CanMixin, {
    modelForAbilities: false,
    _checkAbilities(model) {
        let abilitiesRequired = this.get('abilitiesRequired');
        if (Ember.isArray(abilitiesRequired)) {
            abilitiesRequired.forEach((abilityRequired) => {
                //if we can't preform this ability, forward to the 403 page
                if (this.cannot(abilityRequired, model)) {
                    this.transitionTo('fourOhThree');
                }
            });
        }
    },
    beforeModel() {
        if (!this.get('modelForAbilities')) {
            this._checkAbilities();
        }
        return this._super(...arguments);
    },
    afterModel(model) {
        if (this.get('modelForAbilities')) {
            this._checkAbilities(model);
        }
        return this._super(...arguments);
    }
});
