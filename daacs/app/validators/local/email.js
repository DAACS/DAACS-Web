import Ember from 'ember';
import Base from 'ember-validations/validators/local/format';
import Messages from 'ember-validations/messages';

export default Base.extend({
    init () {
        let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (this.options === true) {
            this.options = {};
        }
        this.options.with = pattern;

        Ember.set(this, 'options.blankMessage',  Messages.render('blank', this.options));

        // this call is necessary, don't forget it!
        this._super();
    },
    call () {
        if (Ember.isEmpty(Ember.get(this.model, this.property))) {
            if (this.options.allowBlank === undefined) {
                this.errors.pushObject(this.options.blankMessage);
            }
        } else if (this.options['with'] && !this.options['with'].test(Ember.get(this.model, this.property))) {
            this.errors.pushObject(this.options.message);
        } else if (this.options.without && this.options.without.test(Ember.get(this.model, this.property))) {
            this.errors.pushObject(this.options.message);
        }
    }
});
