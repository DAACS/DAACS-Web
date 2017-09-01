import Ember from 'ember';

export function initialize(applicationInstance) {
    let fastboot = applicationInstance.lookup('service:fastboot');
    if (fastboot && !fastboot.get('isFastBoot')) {
        Ember.run.scheduleOnce('afterRender', this, function() {
            Ember.$.getScript('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML');
        });
    }
}

export default {
  name: 'mathjax',
  initialize
};
