import Ember from 'ember';

const {
    isArray,
    computed,
    get
} = Ember;

export default function domainContent(type, score) {
    return computed(`domain.rubric.supplementTable.@each.${type}`, function() {
        let table = get(this, 'domain.rubric.supplementTable');

        if(isArray(table)) {
            let scoreContent = table.findBy('completionScore', score);
            return scoreContent ? get(scoreContent, type) : '';
        } else {
            return '';
        }
    });
}
