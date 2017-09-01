import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['tab-panel'],
    classNameBindings: ['active'],
    attributeBindings: ['role', 'aria-labeledby', 'style'],
    style: 'display: none;',
    role: 'tabpanel',
    'aria-labeledby': Ember.computed.alias('assocTab.elementId'),
    tabView: Ember.computed.alias('parentView.parentView'),

    assocTab: Ember.computed('tabView.tabItems.[]', function() {
        const index = this.get('tabView.tabPanels').indexOf(this);
        return this.get('tabView.tabItems').objectAt(index);
    }),

    onInsertElement: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            this.get('tabView').registerTabPanel(this);
        });
    }),

    onDestroyElement: Ember.on('willDestroyElement', function() {
        this.get('tabView').deregisterTabPanel(this);
    }),

    active: Ember.computed('tabView.activeTabItem', function() {
        return this.get('tabView.activeTabItem') === this.get('assocTab');
    }),

    onActiveChange: Ember.observer('active', function() {
        let cssDisplay = this.get('active') ? '' : 'none';
        this.$().css('display', cssDisplay);
    })
});
