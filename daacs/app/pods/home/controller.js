import Ember from 'ember';
import Config from 'daacs/config/environment';

export default Ember.Controller.extend({
    queryParams: ['samlAuthFailed'],
    samlAuthFailed: false,
    errorPageContent: Config.errorPageContent
});
