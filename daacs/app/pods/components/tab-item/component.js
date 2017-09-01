import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNames: ['tab-item'],
    classNameBindings: ['active'],
    attributeBindings: [
        'role',
        'aria-controls',
        'aria-selected',
        'aria-expanded'
    ],

    tabView: Ember.computed.alias('parentView.parentView'),
    activationEvent: Ember.computed.alias('tabView.tabActivationEvent'),

    role: 'tab',
    'aria-controls': Ember.computed.alias('assocTabPanel.elementId'),
    'aria-expanded': Ember.computed.alias('aria-selected'),
    'aria-selected': Ember.computed('active', function() {
        return this.get('active') ? 'true' : 'false';
    }),

    index: Ember.computed('tabView.tabItems.[]', function() {
        return this.get('tabView.tabItems').indexOf(this);
    }),

    assocTabPanel: Ember.computed('index', 'tabView.tabPanels.[]', function() {
        return this.get('tabView.tabPanels').objectAt(this.get('index'));
    }),

    onInsertElement: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            this.get('tabView').registerTabItem(this);
        })
    }),

    onDestroyElement: Ember.on('willDestroyElement', function() {
        this.get('tabView').deregisterTabItem(this);
    }),

    onActiveTabIndexChange: Ember.observer('tabView.activeTabIndex', function() {
        let activeTabItem = this.get('tabView.activeTabItem');

        if(activeTabItem === this) {
            return;
        }

        if(this.get('index') === this.get('activeTabIndex')) {
            this.activate();
        }
    }),

    active: Ember.computed('tabView.activeTabItem', function() {
        return this.get('tabView.activeTabItem') === this;
    }),

    activate() {
        this.get('tabView').activateTab(this);
    },

    onClick: Ember.on('click', function() {
        const evt = this.get('activationEvent');
        if(evt === 'click' || evt === 'all') {
            this.activate();
        }
    }),

    onMouseEnter: Ember.on('mouseEnter', function() {
        const evt = this.get('activationEvent');
        if(evt === 'mouseEnter' || evt === 'all') {
            this.activate();
        }
    })
});
