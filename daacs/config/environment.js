/* eslint-env node */
"use strict";

module.exports = function (environment) {
    let ENV = {
        modulePrefix: "daacs",
        podModulePrefix: "daacs/pods",
        environment,
        rootURL: "/",
        locationType: "auto",
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false,
            },
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },
        "ember-simple-auth": {
            authenticationRoute: "login",
            routeIfAlreadyAuthenticated: "dashboard",
            routeAfterAuthentication: "dashboard",
            isSaml: false,
            samlLoginEndpoint: "",
            samlLogoutEndpoint: "",
            logoutType: "local",
            logoutShown: true,
            allowCreateAccount: false,
            requiresConsent: true,
        },
        "ember-cli-mirage": {},
        i18n: {
            defaultLocale: "en",
        },
        fastboot: {
            htmlFile: "index-configured.html",
            hostWhitelist: [
                /^wwwc-wgu-daacs.gavant.com$/,
                /^web-app$/,
                /^wwwc-excelsior-daacs.gavant.com$/,
                /^wwwd-daacs.gavant.com:\d+$/,
                /^localhost:\d+$/,
            ],
        },
        scoreDisplay: {
            UNSCORED:
                '<div class="score-display-dot-path" aria-label="Not Scored"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>',
            LOW: '<div class="score-display-dot-path" aria-label="Developing"><div class="dot filled"></div><div class="dot highlighted"></div><div class="dot"></div></div>',
            MEDIUM: '<div class="score-display-dot-path" aria-label="Emerging"><div class="dot filled"></div><div class="dot filled"></div><div class="dot highlighted"></div></div>',
            HIGH: '<div class="score-display-dot-path" aria-label="Mastering"><div class="dot filled"></div><div class="dot filled"></div><div class="dot filled"></div></div>',
        },
        dashboardCategoryOrder: [
            "COLLEGE_SKILLS",
            "WRITING",
            "READING",
            "MATHEMATICS",
        ],
        helpDialogContent: {
            beforeForm:
                "If you have any questions about this assessment, or have encountered any technical problems, please fill out and submit the form below.",
            afterForm: "",
        },
        errorPageContent: "",
        "ember-error-logger": {},
    };

    if (environment === "development") {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
        ENV["ember-cli-mirage"].enabled = true;
        ENV.RESTAPI = "http://wwwd-daacs.gavant.com:8080";
        // ENV.RESTAPI = "https://daacs.gavant.com/api";
        ENV[
            "ember-simple-auth"
        ].samlLoginEndpoint = `${ENV.RESTAPI}/saml/login?disco=true&idp=https%3A%2F%2Flogin.excelsior.edu%2Fsimplesaml%2Fsaml2%2Fidp%2Fmetadata.php`;
        ENV["ember-simple-auth"].isSaml = false;
        ENV["ember-simple-auth"].allowCreateAccount = true;
        ENV["simple-auth-oauth2"] = {
            serverTokenEndpoint: `${ENV.RESTAPI}/oauth/token`,
        };

        ENV["ember-error-logger"].consumers = {
            "console-consumer": true,
        };
    }

    if (environment === "test") {
        // Testem prefers this...
        ENV.locationType = "none";

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = "#ember-testing";
        ENV["ember-cli-mirage"].enabled = false;
        ENV.RESTAPI = "https://wwwc-excelsior-daacs.gavant.com/api";
        ENV[
            "ember-simple-auth"
        ].samlLoginEndpoint = `${ENV.RESTAPI}/saml/login?disco=true&idp=https%3A%2F%2Flogin.excelsior.edu%2Fsimplesaml%2Fsaml2%2Fidp%2Fmetadata.php`;
        ENV["ember-simple-auth"].isSaml = true;
        ENV["simple-auth-oauth2"] = {
            serverTokenEndpoint: `${ENV.RESTAPI}/oauth/token`,
        };
    }

    if (environment === "production") {
        ENV["ember-cli-mirage"].enabled = false;
        ENV["simple-auth-oauth2"] = {
            serverTokenEndpoint: `${ENV.RESTAPI}/oauth/token`,
        };

        ENV["ember-error-logger"].consumers = {
            "api-consumer": {
                endpoint: "error-events",
            },
        };
    }

    return ENV;
};
