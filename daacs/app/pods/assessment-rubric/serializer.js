import Ember from 'ember';
import ApplicationSerializer from 'daacs/pods/application/serializer';

const {
    get
} = Ember;

export default ApplicationSerializer.extend({
    serialize() {
        const json = this._super(...arguments);
        const scoreMap = get(json, 'completionScoreMap');

        //if null values are given for any of the score map properties,
        //just delete them completely from the JSON, otherwise the API complains
        if(scoreMap) {
            if(get(scoreMap, 'LOW') === null) {
                delete json.completionScoreMap.LOW;
            }

            if(get(scoreMap, 'MEDIUM') === null) {
                delete json.completionScoreMap.MEDIUM;
            }

            if(get(scoreMap, 'HIGH') === null) {
                delete json.completionScoreMap.HIGH;
            }
        }

        return json;
    }
});
