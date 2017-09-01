import { CanService } from 'ember-can';

export default CanService.extend({
    parse(str) {
        const [abilityName, propertyName] = str.split('.');
        return {
            propertyName,
            abilityName
        };
    }
});
