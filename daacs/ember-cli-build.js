/* eslint-env node */
"use strict";
/* global require, module, process */
const EmberApp = require("ember-cli/lib/broccoli/ember-app");
const Funnel = require("broccoli-funnel");

module.exports = function (defaults) {
    let app = new EmberApp(defaults, {
        "ember-cli-babel": {
            includePolyfill: true,
        },
        sassOptions: {
            includePaths: [
                "bower_components/bootstrap-sass/assets/stylesheets",
                "bower_components/font-awesome/scss",
            ],
        },
        autoprefixer: {
            browsers: [
                //following Bootstrap's lead on what browsers/versions to add CSS vendor prefixes for
                //essentially, support fairly recent versions of all modern browsers, and IE10+
                //@see https://github.com/twbs/bootstrap/blob/v4-dev/grunt/postcss.js
                "Chrome >= 35",
                "Firefox >= 38",
                "Edge >= 12",
                "Explorer >= 10",
                "iOS >= 8",
                "Safari >= 8",
                "Android 2.3",
                "Android >= 4",
                "Opera >= 12",
            ],
        },
        fingerprint: {
            exclude: [
                //this image is referenced in the override.css (which isn't compiled) so we can't fingerprint it
                "assets/images/pattern.png",
            ],
        },
        "ember-composable-helpers": {
            only: ["inc", "filter-by", "find-by", "sort-by", "contains"],
        },
        nodeModulesToVendor: ["node_modules/ace-builds/src-min-noconflict"],
    });

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    app.import("vendor/modernizr/modernizr-custom.js", {
        type: "vendor",
        prepend: true,
        using: [
            {
                transformation: "fastbootShim",
            },
        ],
    });

    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import(
        "bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js",
        {
            using: [
                {
                    transformation: "fastbootShim",
                },
            ],
        }
    );
    app.import("vendor/ace.js");
    app.import("vendor/mode-html.js");
    app.import("vendor/theme-github.js");
    app.import("vendor/jodit/jodit.min.js", {
        using: [
            {
                transformation: "fastbootShim",
            },
        ],
    });
    app.import("vendor/jodit/jodit.min.css");

    app.import("bower_components/font-awesome/fonts/fontawesome-webfont.eot", {
        destDir: "assets/fonts",
    });
    app.import("bower_components/font-awesome/fonts/fontawesome-webfont.svg", {
        destDir: "assets/fonts",
    });
    app.import("bower_components/font-awesome/fonts/fontawesome-webfont.ttf", {
        destDir: "assets/fonts",
    });
    app.import("bower_components/font-awesome/fonts/fontawesome-webfont.woff", {
        destDir: "assets/fonts",
    });
    app.import(
        "bower_components/font-awesome/fonts/fontawesome-webfont.woff2",
        { destDir: "assets/fonts" }
    );

    const openSans = new Funnel("fonts/Open_Sans", {
        include: ["**/*.ttf"],
        destDir: "assets/fonts",
        allowEmpty: true,
    });
    const roboto = new Funnel("fonts/Roboto", {
        include: ["Roboto-Black.ttf", "Roboto-Medium.ttf", "Roboto-Bold.ttf"],
        destDir: "assets/fonts",
        allowEmpty: true,
    });
    const daacsIcons = new Funnel("fonts/DaacsIcons", {
        include: [
            "DaacsIcons.eot",
            "DaacsIcons.svg",
            "DaacsIcons.ttf",
            "DaacsIcons.woff",
        ],
        destDir: "assets/fonts",
        allowEmpty: true,
    });

    return app.toTree([openSans, roboto, daacsIcons]);
};
