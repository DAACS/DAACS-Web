import Ember from 'ember';

const transitioningInClass  = 'ember-transitioning-in';
const transitioningOutClass = 'ember-transitioning-out';

export default Ember.Component.extend({
    tagName: 'li',
    classNameBindings: ['isActive', 'isDisabled', 'isTransitioningIn', 'isTransitioningOut'],

    activeClass: Ember.computed('childLinks.@each.active', function(){
        let activeLink = this.get('childLinks').findBy('active');
        return (activeLink ? activeLink.get('active') : 'active');
    }),

    disabledClass: Ember.computed('childLinks.@each.disabled', function(){
        let disabledLink = this.get('childLinks').findBy('disabled');
        return (disabledLink ? disabledLink.get('disabled') : 'disabled');
    }),

    isActive: Ember.computed('hasActiveLinks', 'activeClass', function() {
        return this.get('hasActiveLinks') ? this.get('activeClass') : false;
    }),

    isDisabled: Ember.computed('allLinksDisabled', 'disabledClass', function() {
        return this.get('allLinksDisabled') ? this.get('disabledClass') : false;
    }),

    isTransitioningIn: Ember.computed('childLinks.@each.transitioningIn', function(){
        if(this.get('childLinks').isAny('transitioningIn')) {
            return transitioningInClass;
        }
    }),

    isTransitioningOut: Ember.computed('childLinks.@each.transitioningOut', function(){
        if(this.get('childLinks').isAny('transitioningOut')) {
            return transitioningOutClass;
        }
    }),

    hasActiveLinks: Ember.computed('childLinks.@each.active', function() {
        return this.get('childLinks').isAny('active');
    }),

    allLinksDisabled: Ember.computed('childLinks.@each.disabled', function() {
        return !Ember.isEmpty(this.get('childLinks')) && this.get('childLinks').isEvery('disabled');
    }),

    init() {
        this._super(...arguments);
        this.set('childLinks', Ember.A([]));
    },

    registerChild(view) {
        this.get('childLinks').pushObject(view);
    }
});
