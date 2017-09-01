import Ember from 'ember';
import layout from '../templates/components/delete-button';

const {
    Component,
    get,
    set,
    computed
} = Ember;

export default Component.extend({
    layout: layout,
    classNames: ['remove-container'],
    classNameBindings: ['confirm', 'isDisabled'],
    tagName: 'span',
    removing: false,
    confirm: false,

    isDisabled: computed('disabled', function() {
        if (get(this, 'disabled')) {
            return true;
        } else {
            return null;
        }
    }),

    title: computed('size', function() {
        return get(this, 'size') === 'small' ? '' : 'Remove';
    }),

    buttonSize: computed('size', function() {
        if (get(this, 'size') === 'small') {
            return 'btn-xs';
        }
    }),

    icon: computed('confirm', function() {
        if (get(this, 'confirm')) {
            return 'glyphicon glyphicon-question-sign';
        } else {
            return 'glyphicon glyphicon-remove';
        }
    }),

    destroyPopover: function() {
        get(this, 'popover').popover('destroy');
        set(this, 'popover', null);
    },

    cancel: function() {
        this.destroyPopover();
        this.toggleProperty('confirm');
        this.destroyOutsideClickListener();

    },

    listenForClicksOutside: function() {
        let listener = Ember.$(document).mouseup((event) => {
            let element = get(this, 'element'),
                container = Ember.$(element),
                describedById = Ember.$(element).find('a').attr('aria-describedby'),
                popup = Ember.$('#' + describedById);
            if (!popup.is(event.target) && !container.is(event.target) && container.has(event.target).length === 0 && popup.has(event.target).length === 0 && this.get('popover')) { // if the target of the click isn't the container...... nor a descendant of the container
                this.cancel();
            }
        });
        set(this, 'listener', listener);
    },

    destroyOutsideClickListener: function() {
        get(this, 'listener').unbind();
    },

    actions: {
        confirm: function() {
            let element, placement;
            if (!get(this, 'disabled')) {
                if (!get(this, 'confirm')) {
                    element = get(this, 'element');
                    placement = get(this, 'placement');

                    set(this, 'popover', Ember.$(element).find('a').popover({
                        container: 'body', // popover will be rendered inside body to prevent clipping by parent elements
                        placement: placement || 'top auto',
                        html: true,
                        content: Ember.$(element).find('.delete-confirmation').html()
                    }));


                    get(this, 'popover').popover('show');
                    this.listenForClicksOutside();
                    this.toggleProperty('confirm');
                } else {
                    this.cancel();
                }
            }
        },

        delete: function() {
            this.toggleProperty('removing');
            this.destroyPopover();
            this.sendAction('remove', get(this, 'model'));
        },

        cancel: function() {
            this.cancel();
        }
    }
});
