import Ember from 'ember';
import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';
import CatGroupTransitions from 'daacs/constants/assessment/cat-group-transitions';

const {
    get,
    computed
} = Ember;

export default Fragment.extend({
    groupDifficulty: attr('string'),
    transitionMap: attr(),

    transitionType: computed('groupDifficulty', function() {
        return CatGroupTransitions.findBy('groupDifficulty', get(this, 'groupDifficulty'));
    })
});
