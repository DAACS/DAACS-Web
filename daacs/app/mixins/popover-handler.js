import Ember from 'ember';

export default Ember.Mixin.create({
    destroyPopover() {
        if (this.get('popover')) {
            this.get('popover').popover('destroy');
            this.set('popover', null);
        }
    },

    cancel() {
        this.destroyPopover();
        this.destroyOutsideClickListener();
    },

    listenForClicksOutside() {
        let listener = Ember.$(document).mouseup((event) => {
            let container = Ember.$(this.get('element')),
                describedById = Ember.$(this.get('element')).find('a').attr('aria-describedby'),
                popup = Ember.$(`#${describedById}`);

            // if the target of the click isn't the container...... nor a descendant of the container
            if (!popup.is(event.target) &&
                !container.is(event.target) &&
                container.has(event.target).length === 0 &&
                popup.has(event.target).length === 0 &&
                this.get('popover'))
            {
                this.cancel();
            }
        });
        this.set('listener', listener);
    },

    destroyOutsideClickListener() {
        if (this.get('listener')) {
            this.get('listener').unbind();
        }
    },

    onDestroyElement: Ember.on('willDestroyElement', function() {
        //make sure the bootstrap popover stuff is cleaned up when the
        //component is destroyed, in cases where it might stil be open
        //during an unexpected destroy (route change, ect)
        this.destroyPopover();
        this.destroyOutsideClickListener();
    }),
    actions: {
        cancel() {
            this.cancel();
        }
    }
});
