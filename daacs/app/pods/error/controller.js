import Ember from 'ember';
import Config from 'daacs/config/environment';

export default Ember.Controller.extend({
    errorPageContent: Config.errorPageContent
});
