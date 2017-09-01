import Ember from 'ember';
import layout from '../templates/components/loading-button';

const {
  get,
  set,
  computed,
  getWithDefault,
  Component
} = Ember;

let positionalParamsMixin = {
  positionalParams: 'params'
};

export default Component.extend(positionalParamsMixin, {
    layout: layout,
    targetObject: computed.alias('parentView.controller') ? computed.alias('parentView.controller') : computed.alias('parentView'),
    tagName: 'button',
    classNames: ['spinner-button', 'btn'],
    classNameBindings: ['isSpinning'],
    attributeBindings: ['disabled', 'title'],
    isSpinning: false,

    style: computed('width', function() {
        let width = get(this, 'width'),
            string = "width:" + width + "px;";
        return Ember.String.htmlSafe(string);
    }),

    click: function (event) {
        event.preventDefault();
        let isSpinning = get(this, 'isSpinning');
        if (!isSpinning) {
            this.setProperties({
                width: Ember.$(get(this, 'element')).find('.fixed-width').width(),
                isSpinning: true
            });
            var params = getWithDefault(this, 'params', []);

            //coerce the returned value into an RSVP promise object to ensure it has a .finally() method
            Ember.RSVP.resolve(this.attrs.clicked(params)).finally(() => {
                if (!this.isDestroyed) {
                    set(this, 'isSpinning', false);
                }
            });
        }
    }
});
