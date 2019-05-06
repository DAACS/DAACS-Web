import Ember from 'ember';
import attr from 'ember-data/attr';
import Fragment from 'model-fragments/fragment';
import { CONTENT_TYPE_WORD, CONTENT_TYPE_FORMULA, CONTENT_TYPE_PASSAGE, CONTENT_TYPE_IMAGE } from 'daacs/constants/assessment/content-types';

const {
    get,
    computed: { equal }
} = Ember;

export default Fragment.extend({
    content: attr('string'),
    itemContentType: attr('string'),

    isWord: equal('itemContentType', get(CONTENT_TYPE_WORD, 'value')),
    isFormula: equal('itemContentType', get(CONTENT_TYPE_FORMULA, 'value')),
    isPassage: equal('itemContentType', get(CONTENT_TYPE_PASSAGE, 'value')),
    isImage: equal('itemContentType', get(CONTENT_TYPE_IMAGE, 'value'))
});
