import Ember from 'ember';

export default Ember.Mixin.create({
    headerTemplate: Ember.computed(function() {
        return `${this.routeName}/header`;
    }),

    footerTemplate: Ember.computed(function() {
        return `${this.routeName}/footer`;
    }),

    renderTemplate() {
        this._super(...arguments);

        this.render(this.get('headerTemplate'), {
            into: 'application',
            outlet: 'header'
        });

        this.render(this.get('footerTemplate'), {
            into: 'application',
            outlet: 'footer'
        });
    }
});
