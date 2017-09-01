import Ember from 'ember';
import Config from 'daacs/config/environment';

const {
    get,
    computed,
    computed: { empty }
} = Ember;

export default Ember.Component.extend({
    classNames: ['score-display'],
    classNameBindings: ['small', 'noScore'],
    attributeBindings: ['aria-label'],
    noScore: empty('score'),
    small: false,

    content: computed('score', function() {
        return get(Config, `scoreDisplay.${this.get('score') || 'UNSCORED'}`);
    })
});
