import Ember from 'ember';
import Base from 'ember-validations/validators/local/format';
import Messages from 'ember-validations/messages';

export default Base.extend({
    init() {
        if(this.options === true) {
            this.options = {
                message: Messages.render('validJson', this.options)
            };
        }

        Ember.set(this, 'options.blankMessage',  Messages.render('blank', this.options));
        this._super(...arguments);
    },

    call() {
        const value = Ember.get(this.model, this.property);

        if(!this.options.allowBlank && Ember.isEmpty(value)) {
            this.errors.pushObject(this.options.blankMessage);
            return;
        }

        try {
            JSON.parse(value);
        } catch(err) {
            this.errors.pushObject(this.options.message);
        }
    }
});
