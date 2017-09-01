import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
    embed: true,

    keyForModel() {
        return 'data';
    },

    keyForCollection() {
        return 'data';
    }
});
