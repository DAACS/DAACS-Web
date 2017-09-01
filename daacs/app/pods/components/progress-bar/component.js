import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['progress'],
    value: 0,
    minValue: 0,
    maxValue: 100,
    showLabel: true,
    labelAlignment: 'center',
    striped: true,
    //success|info|warning|danger|skin
    style: null,

    percentageValue: Ember.computed('value', function() {
        let val = this.get('value');
        return Math.floor((!Ember.isEmpty(val) && !isNaN(val) ? val : 0) * 100);
    }),

    contextClass: Ember.computed('style', function() {
        const style = this.get('style');
        return style ? `progress-bar-${style}` : null;
    }),

    progressBarClasses: Ember.computed('contextClass', 'striped', 'labelAlignment', function() {
        const { contextClass, striped } = this.getProperties('contextClass', 'striped');
        const classes = [
            'progress-bar',
            `text-${this.get('labelAlignment')}`
        ];

        if(contextClass) {
            classes.push(contextClass);
        }

        if(striped) {
            classes.push('progress-bar-striped')
        }

        return classes.join(' ');
    }),

    progressBarStyle: Ember.computed('percentageValue', function() {
        return `width: ${this.get('percentageValue')}%;`;
    })
});
