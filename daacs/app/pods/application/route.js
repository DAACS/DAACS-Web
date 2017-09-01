import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Authentication from 'daacs/mixins/authentication';
import PageLayout from 'daacs/mixins/page-layout';
import Config from 'daacs/config/environment';

const { isEmpty } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, Authentication, PageLayout, {
    advisor: Ember.inject.service(),
    fastboot: Ember.inject.service(),
    currentUser: Ember.inject.service('current-user'),
    userEvents: Ember.inject.service('user-events'),

    title(tokens) {
        let tokenList = (!Ember.isEmpty(tokens) ? `${tokens.join(' - ')} - ` : '');
        return `${tokenList}${this.get('i18n').t('brand.name')}`;
    },

    queryParams: {
        userId: { refreshModel: true }
    },

    async beforeModel(transition) {
        if (this.get('session.isAuthenticated')) {
            return await this._loadCurrentUser();
        }

        //if the app is not configured for SAML or in fastboot, don't do anything else
        if(!Config['ember-simple-auth'].isSaml || this.get('fastboot.isFastBoot')) {
            return;
        }

        //look for a 'token' query parameter is is passed after a successful SAML login
        const token = Ember.get(transition, 'queryParams.token');

        if(!Ember.isEmpty(token)) {
            try {
                //attempt to authenticate locally using the passed token
                return await this.authenticateWithOauth(token, null);
            } catch (error) {
                transition.abort();
                this.replaceWith('home', {queryParams: {samlAuthFailed: true}});
                return Ember.RSVP.reject(error);
            }
        }
    },

    afterModel(model, transition) {
        this._super(...arguments);
        return this.setStudentId(transition);
    },

    setupController(controller) {
        this._super(...arguments);
        //clear the token parameter from the queryParams so it doesn't remain in the browser URL
        controller.set('token', null);
    },

    async sessionAuthenticated() {
        //before transitioning to the routeAfterAuthentication route, fetch and store the current user
        try {
            const currentUser = await this._loadCurrentUser();
            const attemptedTransition = this.get('session.attemptedTransition');

            if (attemptedTransition) {
                await attemptedTransition.retry();
                this.set('session.attemptedTransition', null);
            } else {
                if(Config['ember-simple-auth'].isSaml) {
                    await this.transitionToAttemptedRoute();
                } else {
                    await this.transitionTo(Config['ember-simple-auth'].routeAfterAuthentication);
                }
            }

            this.openConsentModal();
            return currentUser;
        } catch(error) {
            Ember.RSVP.reject(error);
        }
    },

    async setStudentId(transition) {
        try {
            if(this.get('session.isAuthenticated')) {
                let user = null;
                //check if there is a userId param first
                if(!isEmpty(transition.queryParams.userId)) {
                    user = await this.store.findRecord('user', transition.queryParams.userId);
                //otherwise check if there is a username param
                } else if(!isEmpty(transition.queryParams.username)) {
                    user = await this.store.queryRecord('user', {username: transition.queryParams.username});
                //otherwise check if there is a secondaryId param
                } else if(!isEmpty(transition.queryParams.secondaryId)) {
                    user = await this.store.queryRecord('user', {secondaryId: transition.queryParams.secondaryId});
                }

                this.get('advisor').set('selectedUser', user);
                return user;
            }
        } catch(error) {
            //swallow errors to gracefully fail (i.e. the user dropdown will just not be set if the userId was invalid)
            return Ember.RSVP.resolve();
        }
    },

    openConsentModal() {
        //open the user consent dialog if the user has not consented
        if(Config['ember-simple-auth'].requiresConsent && this.get('session.user.isStudent') && Ember.isNone(this.get('session.user.hasDataUsageConsent'))) {
            this.send('openModal', 'user-consent-modal', null, 'user-consent-modal');
        }
    },

    activate() {
        if (!this.get('fastboot.isFastBoot')) {
            Ember.$('body').addClass('app-loaded');
            Ember.run.scheduleOnce('afterRender', this, 'openConsentModal');
        }
    },

    _loadCurrentUser () {
        return this.get('currentUser').load();
    },

    actions: {
        error(errorInfo) {
            if (errorInfo && Ember.isArray(errorInfo.errors) && errorInfo.errors.length > 0) {
                let error = errorInfo.errors.get('firstObject');
                if (error.status === '403') {
                    return this.replaceWith('fourOhThree');
                } else if (error.status === '401') {
                    return this.browserRedirect('/login');
                } else if (error.status === '404') {
                    return this.replaceWith('fourOhFour', '404');
                }

                //if the status code isn't specifically handled, let it bubble
                //so that an error substate route can be shown
                return true;
            }
        },

        invalidateSession() {
            this.get('session').invalidate();
        },

        openModal(templateName, model, controller) {
            this.render(templateName, {
                into: 'application',
                outlet: 'modal',
                //if controller is null, it will use default controller
                controller: controller || null,
                model
            });

            this.get('userEvents').logEvent('PAGE_VIEW', {
                url: `${this.get('router.url')}#${templateName}`,
                title: templateName
            });
        },

        closeModal() {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        willTransition() {
            this.send('closeModal');
        },

        changeSelectedUser() {
            this.transitionTo('dashboard');
        }
    }
});
