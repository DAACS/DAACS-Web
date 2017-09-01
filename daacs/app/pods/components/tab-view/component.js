import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['tab-view'],
    tabActivationEvent: 'click',
    activeTabItem: null,
    activeTabIndex: 0,

    onInit: Ember.on('init', function() {
        this.set('tabItems', Ember.A());
        this.set('tabPanels', Ember.A());
    }),

    onInsertElement: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            const tabItem = this.get('tabItems').objectAt(this.get('activeTabIndex'));

            if(tabItem) {
                this.activateTab(tabItem);
            }
        });
    }),

    activateTab(tabItem) {
        const tabIndex = this.get('tabItems').indexOf(tabItem);
        this.set('activeTabItem', tabItem);
        this.set('activeTabIndex', tabIndex);
    },

    registerTabItem(tabItem) {
        this.get('tabItems').pushObject(tabItem);
    },

    registerTabPanel(tabPanel) {
        this.get('tabPanels').pushObject(tabPanel);
    },

    deregisterTabItem(tabItem) {
        this.get('tabItems').removeObject(tabItem);
    },

    deregisterTabPanel(tabPanel) {
        this.get('tabPanels').removeObject(tabPanel);
    }
});
