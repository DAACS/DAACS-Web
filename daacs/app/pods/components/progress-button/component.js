import Ember from 'ember';

export default Ember.LinkComponent.extend({
    classNames: ['btn', 'progress-btn'],
    progressBarStyle: Ember.computed('progress', function() {
        let progress = this.get('progress'),
            pct = isNaN(progress) ? 0 : Math.floor(progress * 100);

        return `width: ${pct}%;`;
    })
});
