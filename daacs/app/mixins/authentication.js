import Ember from 'ember';
import Config from 'daacs/config/environment';

export default Ember.Mixin.create({
    cookies: Ember.inject.service(),
    fastboot: Ember.inject.service(),
    logoutShown: Config['ember-simple-auth'].logoutShown,

    allowAccountCreation: Ember.computed(function() {
        return Config['ember-simple-auth'].allowCreateAccount && !Config['ember-simple-auth'].isSaml;
    }),

    getCurrentUser() {
        return this.get('store').find('user', 'me').then((currentUser) => {
            this.get('session').set('user', currentUser);
            return currentUser;
        });
    },

    logout() {
        if(Config['ember-simple-auth'].logoutType === 'saml') {
            this.browserRedirect(Config['ember-simple-auth'].samlLogoutEndpoint);
        } else {
            this.get('session').invalidate();
        }
    },

    async authenticateWithOauth(identification, password) {
        this.set('authError', null);
        const authenticator = 'oauth2-authenticator:oauth2-password-grant';
        const grantType = Config['ember-simple-auth'].isSaml ? 'saml' : 'password';

        if(!this.localStorageEnabled() || !this.cookiesEnabled()) {
            this.openCookiesModal();
            return Ember.RSVP.reject({data: {error: 'cookies_disabled'}});
        }

        try {
            const result = await this.get('session').authenticate(
                authenticator,
                identification,
                password,
                'read write',
                grantType
            );

            return result;

        } catch (error) {
            this.set('authError', error);
            return Ember.RSVP.reject(error);
        }
    },

    redirectToSamlLogin(attemptedTransition) {
        if(!this.get('fastboot.isFastBoot') &&  (!this.localStorageEnabled() || !this.cookiesEnabled())) {
            return this.openCookiesModal();
        }

        this.get('session').set('data.samlRedirectAttemptedRoute', {
            url: attemptedTransition.intent.url,
            target: attemptedTransition.intent.name,
            params: attemptedTransition.intent.contexts,
            queryParams: attemptedTransition.intent.queryParams
        });

        this.browserRedirect(Config['ember-simple-auth'].samlLoginEndpoint);
    },

    transitionToAttemptedRoute() {
        let attemptedRoute = this.get('session.data.samlRedirectAttemptedRoute'),
            transitionArgs;

        if(attemptedRoute) {
            transitionArgs = this.buildTransitionArgs(attemptedRoute);
            this.get('session').set('data.samlRedirectAttemptedRoute', null);
            //support both route and controller contexts
            return this[this.replaceWith ? 'replaceWith' : 'replaceRoute'].apply(this, transitionArgs);
        } else {
            //default to the routeAfterAuthentication if no attempted route was stored
            return this[this.replaceWith ? 'replaceWith' : 'replaceRoute'](Config['ember-simple-auth'].routeAfterAuthentication);
        }
    },

    buildTransitionArgs(route) {
        let {url, target, params, queryParams} = route,
            args = [];

        if(!Ember.isEmpty(url)) {
            //if the attempted transition comes from the browser (e.g. initial page load URL)
            //the target destination is given as a plain string URL
            args.push(url);
        } else {
            args.push(target);

            if(params) {
                args = args.concat(params);
            }

            if(queryParams) {
                args.push({queryParams});
            }
        }

        return args;
    },

    openCookiesModal() {
        this.send('openModal', 'cookies-disabled-modal', null, 'cookies-disabled-modal');
    },

    localStorageEnabled() {
        try {
            localStorage.setItem('testLsItem', 1);
            localStorage.removeItem('testLsItem');
            return true;
        } catch(e) {
            return false;
        }
    },

    cookiesEnabled() {
        if(!navigator || !navigator.cookieEnabled) {
            return false;
        }

        try {
            let cookiesService = this.get('cookies');
            cookiesService.write('testCookie', new Date().getTime());

            let testCookie = cookiesService.read('testCookie');
            if(!testCookie) {
                return false;
            } else {
                 cookiesService.clear('testCookie');
                 return true;
             }
        } catch(e) {
            return false;
        }
    },

    browserRedirect(url, statusCode = 307) {
        if(this.get('fastboot.isFastBoot')) {
            this.set('fastboot.response.statusCode', statusCode);
            this.get('fastboot.response.headers').set('Location', url);
        } else {
            window.location.href = url;
        }
    }
});
