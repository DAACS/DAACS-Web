import Ember from 'ember';
import LoadingButton from '../loading-button/component';
import PopoverHandler from 'daacs/mixins/popover-handler';

export default LoadingButton.extend(PopoverHandler, {
    classNames: ['save-confirmation-button', 'confirmation-container'],
    click(event) {
        event.preventDefault();

        if (this.get('isDisabled')) {
            return false;
        }

        if (!this.get('isSpinning')) {
            let element = this.get('element'),
                placement = this.get('placement'),
                shouldConfirm = true;

            if (this.attrs.shouldConfirm) {
                shouldConfirm = this.attrs.shouldConfirm();
            }
            if (shouldConfirm) {
                this.set('popover', Ember.$(element).popover({
                    // popover will be rendered inside body to prevent clipping by parent elements
                    container: 'body',
                    placement: placement || 'top auto',
                    html: true,
                    content: Ember.$(element).find('.save-confirmation').html()
                }));

                this.get('popover').popover('show');
                this.listenForClicksOutside();
            } else {
                this.save();
            }
        }
    },
    save () {
        this.setProperties({
            width: Ember.$(Ember.get(this, 'element')).find('.fixed-width').width(),
            isSpinning: true
        });

        const params = Ember.getWithDefault(this, 'params', []);

        //coerce the returned value into an RSVP promise object to ensure it has a .finally() method
        Ember.RSVP.resolve(this.attrs.submit(params)).finally(() => {
            if (!this.isDestroyed) {
                Ember.set(this, 'isSpinning', false);
            }
        });
    },
    actions: {
        confirm () {
            this.save();
        }
    }
});
