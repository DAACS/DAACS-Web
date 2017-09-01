import { fragment } from 'model-fragments/attributes';
import Fragment from 'model-fragments/fragment';

export default Fragment.extend({
    question: fragment('item-content-block'),
    feedback: fragment('item-content-block')
});
