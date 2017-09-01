import Ember from 'ember';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),
    classNames: ['performance-stars'],
    classNameBindings: ['small', 'noScore'],
    attributeBindings: ['title'],
    noScore: Ember.computed.empty('score'),
    //NONE|LOW|MEDIUM|HIGH
    score: 'LOW',
    numStars: {
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3
    },

    starIcons: Ember.computed('score', function() {
        let icons = Ember.A(),
            score = this.get('score'),
            numStars = this.get(`numStars.${score}`) || 0;

        for(let i=1; i<=3; i++) {
            icons.pushObject(numStars >= i ? 'star' : 'star-o');
        }

        return icons;
    }),

    title: Ember.computed('score', function() {
        let score = this.get('score');
        return this.get('i18n').t(`assessment.performance.${score ? score.toLowerCase() : 'notGraded'}`);
    })
});
