import Ember from 'ember';
import Base from 'ember-validations/validators/local/format';
import Messages from 'ember-validations/messages';

export default Base.extend({
    init() {
        if(this.options === true) {
            this.options = {};
        }

        Ember.set(this, 'options.blankMessage',  Messages.render('blank', this.options));
        this._super(...arguments);
    },

    call() {
        const value = Ember.get(this.model, this.property);
        const anyIsBlank = !Ember.isArray(value) || !Ember.isNone(value.find(str => Ember.isBlank(str)));

        if(!this.options.allowBlank && anyIsBlank) {
            this.errors.pushObject(this.options.blankMessage);
            return;
        }
    }
});
