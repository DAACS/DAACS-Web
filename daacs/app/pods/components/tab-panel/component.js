import Ember from 'ember';

const {
    get,
    computed,
    computed: { alias, reads },
    String: { htmlSafe },
    run: { scheduleOnce }
} = Ember;

export default Ember.Component.extend({
    classNames: ['tab-panel'],
    classNameBindings: ['active'],
    attributeBindings: ['role', 'aria-labeledby', 'style'],
    role: 'tabpanel',
    'aria-labeledby': alias('assocTab.elementId'),
    tabView: reads('parentView.parentView'),

    style: computed('active', function() {
        return get(this, 'active') ? null : htmlSafe('display:none;');
    }),

    assocTab: computed('tabView.tabItems.[]', function() {
        const index = get(this, 'tabView.tabPanels').indexOf(this);
        return get(this, 'tabView.tabItems').objectAt(index);
    }),

    onInsertElement: Ember.on('didInsertElement', function() {
        scheduleOnce('afterRender', this, () => get(this, 'tabView').registerTabPanel(this));
    }),

    onDestroyElement: Ember.on('willDestroyElement', function() {
        get(this, 'tabView').deregisterTabPanel(this);
    }),

    active: Ember.computed('tabView.activeTabItem', function() {
        return get(this, 'tabView.activeTabItem') === get(this, 'assocTab');
    })
});
