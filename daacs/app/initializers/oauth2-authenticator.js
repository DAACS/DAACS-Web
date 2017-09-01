import OAuth2Authenticator from 'daacs/authenticators/oauth2';

export function initialize(application) {
    application.register('oauth2-authenticator:oauth2-password-grant', OAuth2Authenticator);
}

export default {
  name: 'oauth2-authenticator',
  initialize
};
