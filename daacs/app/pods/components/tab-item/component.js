import Ember from 'ember';

const {
    get,
    on,
    observer,
    computed,
    computed: { reads, alias },
    run: { scheduleOnce }
} = Ember;

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

    tabView: reads('parentView.parentView'),
    activationEvent: alias('tabView.tabActivationEvent'),

    role: 'tab',
    'aria-controls': alias('assocTabPanel.elementId'),
    'aria-expanded': alias('aria-selected'),
    'aria-selected': computed('active', function() {
        return get(this, 'active') ? 'true' : 'false';
    }),

    index: computed('tabView.tabItems.[]', function() {
        return get(this, 'tabView.tabItems').indexOf(this);
    }),

    assocTabPanel: computed('index', 'tabView.tabPanels.[]', function() {
        return get(this, 'tabView.tabPanels').objectAt(get(this, 'index'));
    }),

    onInsertElement: on('didInsertElement', function() {
        scheduleOnce('afterRender', this, function() {
            get(this, 'tabView').registerTabItem(this);
        })
    }),

    onDestroyElement: on('willDestroyElement', function() {
        get(this, 'tabView').deregisterTabItem(this);
    }),

    onActiveTabIndexChange: observer('tabView.activeTabIndex', function() {
        let activeTabItem = get(this, 'tabView.activeTabItem');

        if(activeTabItem === this) {
            return;
        }

        if(get(this, 'index') === get(this, 'activeTabIndex')) {
            this.activate();
        }
    }),

    active: computed('tabView.activeTabItem', function() {
        return get(this, 'tabView.activeTabItem') === this;
    }),

    activate() {
        get(this, 'tabView').activateTab(this);
    },

    onClick: on('click', function() {
        const evt = get(this, 'activationEvent');
        if(evt === 'click' || evt === 'all') {
            this.activate();
        }
    }),

    onMouseEnter: on('mouseEnter', function() {
        const evt = get(this, 'activationEvent');
        if(evt === 'mouseEnter' || evt === 'all') {
            this.activate();
        }
    })
});
