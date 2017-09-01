import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import Config from 'daacs/config/environment';
import HandleApiErrors from 'daacs/mixins/handle-api-errors';

export default AjaxService.extend(HandleApiErrors, {
    session: Ember.inject.service(),
    host: Config.RESTAPI,
    headers: Ember.computed('session.isAuthenticated', {
        get() {
            const isAuthenticated = this.get('session.isAuthenticated');
            const headers = {
                'Content-Type': 'application/vnd.api+json'
            };

            if(isAuthenticated) {
                headers['Authorization'] = `Bearer ${this.get('session').get('data').authenticated.access_token}`;
            }

            return headers;
        }
    }),

    stringifyData(data) {
        return JSON.stringify({data});
    }
});
