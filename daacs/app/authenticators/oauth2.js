import Ember from 'ember';
import Authenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Config from 'daacs/config/environment';

const {
    inject: { service }
} = Ember;

export default Authenticator.extend({
    userEvents: service('user-events'),
    serverTokenEndpoint: Config['simple-auth-oauth2'].serverTokenEndpoint,

    async authenticate(identification, password, scope = [], grantType = 'password') {
        const serverTokenEndpoint = this.get('serverTokenEndpoint');
        const scopesString = Ember.makeArray(scope).join(' ');
        const data = {
            grant_type: grantType,
            client_id: 'web'
        };

        if (grantType === 'saml') {
            data.token = identification;
        } else {
            data.username = identification;
            data.password = password;
        }

        if (!Ember.isEmpty(scopesString)) {
            data.scope = scopesString;
        }

        try {
            let response = await this.makeRequest(serverTokenEndpoint, data);
            response = response.data;
            return Ember.run(() => {
                const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
                this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
                if (!Ember.isEmpty(expiresAt)) {
                  response = Ember.merge(response, { 'expires_at': expiresAt });
                }
                Ember.$('body').addClass('authenticated');
                return response;
            });
        } catch (xhr) {
            return Ember.RSVP.reject(xhr.responseJSON || xhr.responseText);
        }
    },

    async invalidate() {
        try {
            await this.get('userEvents').logEvent('LOGOUT');
            return this._super(...arguments);
        } catch(error) {
            //make sure we continue with the session invalidation even if the
            //request to record the user event fails, to handle situations
            //where the user's session is no longer valid on the server (i.e. API server restarts)
            return this._super(...arguments);
        }
    }
});
