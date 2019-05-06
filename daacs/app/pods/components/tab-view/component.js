import Ember from 'ember';

const {
    A,
    get,
    set,
    computed,
    on
} = Ember;

export default Ember.Component.extend({
    classNames: ['tab-view'],
    tabActivationEvent: 'click',
    activeTabIndex: 0,

    activeTabItem: computed('activeTabIndex', 'tabItems.[]', function() {
        return get(this, 'tabItems').objectAt(get(this, 'activeTabIndex'));
    }),

    onInit: on('init', function() {
        set(this, 'tabItems', A());
        set(this, 'tabPanels', A());
    }),

    activateTab(tabItem) {
        const tabIndex = get(this, 'tabItems').indexOf(tabItem);
        set(this, 'activeTabIndex', tabIndex);
    },

    registerTabItem(tabItem) {
        get(this, 'tabItems').pushObject(tabItem);
    },

    registerTabPanel(tabPanel) {
        get(this, 'tabPanels').pushObject(tabPanel);
    },

    deregisterTabItem(tabItem) {
        get(this, 'tabItems').removeObject(tabItem);
    },

    deregisterTabPanel(tabPanel) {
        get(this, 'tabPanels').removeObject(tabPanel);
    }
});
