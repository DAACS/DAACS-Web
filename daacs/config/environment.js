/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'daacs',
    podModulePrefix: 'daacs/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
        FEATURES: {
            // Here you can enable experimental features on an ember canary build
            // e.g. 'with-controller': true
        }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth': {
        authenticationRoute: 'login',
        routeIfAlreadyAuthenticated: 'dashboard',
        routeAfterAuthentication: 'dashboard',
        isSaml: false,
        samlLoginEndpoint: '',
        samlLogoutEndpoint: '',
        logoutType: 'local',
        logoutShown: true,
        allowCreateAccount: true,
        requiresConsent: false
    },
    'ember-cli-mirage': {

    },
    i18n: {
      defaultLocale: 'en'
    },
    fastboot: {
      htmlFile: 'index-configured.html',
      hostWhitelist: [/^localhost:\d+$/]
    },
    scoreDisplay: {
      UNSCORED: '<div class="score-display-dot-path" aria-label="Not Scored"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>',
      LOW: '<div class="score-display-dot-path" aria-label="Developing"><div class="dot filled"></div><div class="dot highlighted"></div><div class="dot"></div></div>',
      MEDIUM: '<div class="score-display-dot-path" aria-label="Emerging"><div class="dot filled"></div><div class="dot filled"></div><div class="dot highlighted"></div></div>',
      HIGH: '<div class="score-display-dot-path" aria-label="Mastering"><div class="dot filled"></div><div class="dot filled"></div><div class="dot filled"></div></div>'
    },
    dashboardCategoryOrder: ['COLLEGE_SKILLS', 'WRITING', 'READING', 'MATHEMATICS'],
    helpDialogContent: {
        beforeForm: 'If you have any questions about this assessment, or have encountered any technical problems, please fill out and submit the form below.',
        afterForm: ''
    },
    errorPageContent: '',
    'ember-error-logger': {

    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'].enabled = false;
    ENV.RESTAPI = 'http://localhost:8080';
    ENV['ember-simple-auth'].samlLoginEndpoint = ENV.RESTAPI + '/saml/login';
    ENV['ember-simple-auth'].isSaml = false;
    ENV['ember-simple-auth'].allowCreateAccount = true;
    ENV['simple-auth-oauth2'] = {
        serverTokenEndpoint: ENV.RESTAPI + '/oauth/token'
    };

    ENV['ember-error-logger'].consumers = {
      'console-consumer': true
    };
  }

  if (environment === 'test') {
    ENV['ember-cli-mirage'].enabled = false;
    ENV.RESTAPI = 'https://localhost:8080/api';
    ENV['ember-simple-auth'].samlLoginEndpoint = ENV.RESTAPI + '/saml/login';
    ENV['ember-simple-auth'].isSaml = true;
    ENV['simple-auth-oauth2'] = {
        serverTokenEndpoint: ENV.RESTAPI + '/oauth/token'
    };
  }

  if (environment === 'production') {
    ENV['ember-cli-mirage'].enabled = false;
    ENV['simple-auth-oauth2'] = {
        serverTokenEndpoint: ENV.RESTAPI + '/oauth/token'
    };

    ENV['ember-error-logger'].consumers = {
      'api-consumer': {
        'endpoint': 'error-events'
      }
    };
  }

  return ENV;
};
