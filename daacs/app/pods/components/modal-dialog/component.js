import Ember from 'ember';

export default Ember.Component.extend({
    closeButton: true,
    closeOnEsc: true,
    backdrop: true,

    didKeyPress(event) {
        //dont catch enter keypresses inside textareas, so the user is able to type carriage returns
        if(event.which === 13 && event.target.tagName !== 'TEXTAREA' && Ember.canInvoke(this.attrs, 'enter-key')) {
            event.preventDefault();
            this.attrs['enter-key']();
        }
    },

    onInsertElement: Ember.on('didInsertElement', function() {
        Ember.$(document).on('keypress', this.didKeyPress.bind(this));
        this.$('.modal').modal({
            backdrop: this.get('backdrop'),
            keyboard: this.get('closeOnEsc')
        }).on('hidden.bs.modal', function() {
            this.sendAction('cancel');
        }.bind(this));
    }),

    onDestroyElement: Ember.on('willDestroyElement', function() {
        this.$('.modal').modal('hide');
        this.sendAction('cancel');
        Ember.$(document).off('keypress', this.didKeyPress);
    })
});
