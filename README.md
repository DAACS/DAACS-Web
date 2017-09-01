# DAACS Web Application

The front-end website of the Diagnostic Assessment & Achievement of College Skills application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the `daacs` subdirectory of the newly created repository directory
* `npm install`
* `bower install`
* change into the `node` subdirectory of the newly created repository directory
* `npm install`

## Running / Development

This project uses [Ember FastBoot](http://ember-fastboot.com/) as part of its backend technology stack. FastBoot provides a method of rendering the Ember.js single-page application on the server side (via Node.js), which provides many benefits, such as greatly improved SEO crawl-ability and faster page loads for users.

To run the application locally using FastBoot:

* change into the `daacs` subdirectory
* `ember build`
* change into the `node` subdirectory
* `npm start`
* Visit the app at [http://localhost:3000](http://localhost:3000).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* change into the `daacs` subdirectory
* `ember test`
* `ember test --server`

### Building

* change into the `daacs` subdirectory
* `ember build` (development)
* `ember build --environment production` (production)

### Modifying Theme Colors

This project uses [SASS](http://sass-lang.com/) to generate the application's CSS files. To customize the overall color scheme, you can adjust several SASS variables located in `daacs/app/styles/_variables.scss`:

- `$themecolor` - The primary branding color. default: `#54075B` (dark purple)
- `$skincolor` - Secondary/accent color. default: `#edac15` (gold)

Both of these colors should be relatively dark for optimal contrast/readability, as they used as text colors on a white background in various parts of the user interface.

There are additional variables in `_variables.scss` that may be customized, such as font and form styles, however changing these properties may result in undesirable side effects in the application, so do so with caution.

After making any changes to the SASS files, you must re-run `ember build` to generate new CSS files.


### Runtime CSS Modification

The color scheme and CSS styles of the application in general can also be modified at runtime by supplying a CSS override file, which will be injected into the application via a <link> tag in the rendered HTML page, included after all of the app's CSS assets. A path to a CSS file must be specified in the environment variable `CLIENT_CSS_PATH`, which will be copied to the application's assets directory when the server starts up.

Included in this repository is a CSS overrides "template" file, which should be used as the starting point for your customized override file. It is located at `daacs/app/styles/override-template.css`. This file contains all the styles needed to change the overall base color scheme, and is set to the default values of the application. Note that each color value may be used in multiple places in this file, so make sure to replace every instance of the value with your customized value.

### Collapsible Content Areas

Any assessment content areas may contain collapsible content areas by using specific HTML markup that is compatible with the [Bootstrap framework's Collapse plugin](http://getbootstrap.com/javascript/#collapse). As detailed in the Bootstrap website's documentation, almost any type of HTML element (such as a `<button>` or `<a>` link) may be utilized as a collapsible region toggle, by giving it the `data-toggle="collapse"` and `data-target="#collapsible-element-id"` attributes (where `collapsible-element-id` is the `id=""` value of the element that you want to be toggled). Additionally, the target element must be either be given a `class=""` attribute value of either `class="collapse"` (to have the content initially hidden), or `class="collapse in"` (to have the content initially shown).

An accordion type behavior (where only one collapsible area is visible at a given time for a group of collapsible areas) may also be employed by giving the toggle elements a `data-parent="#parent-element-id"` attribute, which specifies an element higher up in the structure that is the shared parent element of all the collapsible toggles that you want to group together.

Below is the HTML for an example accordion layout:

```js
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">This is the collapsible content.</div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">This is the collapsible content.</div>
    </div>
  </div>
</div>
```

**Important Notes**

* Make sure `id=""` attribute values are unique! If there are duplicate element IDs rendered on the same page, it may cause the collapsible behavior to not function correctly.
* Be sure to include the `aria-` and `role` attributes on the controls and collapsible areas as shown in the documentation's examples for optimal accessibility and full ADA compliance.
* Use the standard Bootstrap classes for accordion layouts (e.g. `panel-group`, `panel`, `panel-heading`, `panel-body`, ect) where possible, so they will be automatically styled to match the UI of the rest of the application.

### Hiding Content Based on User Consent

Upon login, students are asked if they agree to allow DAACS to use their data for research purposes. Content within an assessment (such as domain feedback) may be conditionally hidden based on whether the student consented or did not consent by applying CSS classes.

* `hidden-for-nonconsenting` - Hides content within the element if the user has **not** consented to allow usage of their data. Example: `<p class="hidden-for-nonconsenting">All of this content will be hidden to non-consenting users.</p>`

* `hidden-for-consenting` - Hides content within the element if the user has consented to allow usage of their data. Example: `<p class="hidden-for-consenting">All of this content will be hidden to consenting users.</p>`

## Technologies

- [Node.js](http://nodejs.org/) ([license](https://github.com/nodejs/node/blob/master/LICENSE))
- [npm](https://www.npmjs.com/) ([license](https://docs.npmjs.com/policies/license))
- [Bower](http://bower.io/) ([license](https://github.com/bower/bower/blob/master/LICENSE))
- [PhantomJS](http://phantomjs.org/) ([license](https://github.com/ariya/phantomjs/blob/master/LICENSE.BSD))
- [ember.js 2.6.0](http://emberjs.com/) ([license](https://github.com/emberjs/ember.js/blob/master/LICENSE))
- [ember-data 2.6.0](https://github.com/emberjs/data) ([license](https://github.com/emberjs/data/blob/master/LICENSE))
- [ember-cli 2.6.1](http://ember-cli.com/) ([license](https://github.com/ember-cli/ember-cli/blob/master/LICENSE))
- [express.js 4.14.0](https://expressjs.com/) ([license](https://github.com/expressjs/express/blob/master/LICENSE))
- [Bootstrap (SASS) 3.3.6](http://getbootstrap.com/) ([license](https://github.com/twbs/bootstrap-sass/blob/master/LICENSE))
- [Font Awesome 4.6.3](http://fontawesome.io/) ([license](http://fontawesome.io/license/))
- [MathJax 2.7.0](https://www.mathjax.org/) ([license](https://github.com/mathjax/MathJax/blob/master/LICENSE))
- [ember-cli-fastboot 1.0.0-beta.8](http://ember-fastboot.com/) ([license](https://github.com/ember-fastboot/ember-cli-fastboot/blob/master/LICENSE.md))
- [ember-simple-auth 1.1.0](http://ember-simple-auth.com/) ([license](https://github.com/simplabs/ember-simple-auth/blob/master/LICENSE))
- [ember-cli-mirage 0.2.1](http://www.ember-cli-mirage.com/) ([license](https://github.com/samselikoff/ember-cli-mirage/blob/master/LICENSE.md))
- [ember-i18n 4.2.2](https://github.com/jamesarosen/ember-i18n) ([license](https://github.com/jamesarosen/ember-i18n/blob/master/LICENSE))
- [ember-light-table 1.4.0](http://offirgolan.github.io/ember-light-table/) ([license](https://github.com/offirgolan/ember-light-table/blob/master/LICENSE.md))
- [ember-power-select 1.0.0-beta.21](http://www.ember-power-select.com/) ([license](https://github.com/cibernox/ember-power-select/blob/master/LICENSE.md))
- [ember-responsive 1.2.7](https://freshbooks.github.io/ember-responsive/) ([license](https://github.com/freshbooks/ember-responsive/blob/master/LICENSE.md))
- [ember-notify 5.1.0](https://github.com/aexmachina/ember-notify) ([license](https://github.com/aexmachina/ember-notify/blob/master/LICENSE.md))
- [ember-uploader 1.1.0](https://github.com/benefitcloud/ember-uploader) ([license](https://github.com/benefitcloud/ember-uploader/blob/master/LICENSE.md))
- [ember-moment 7.0.0-beta.3](https://github.com/stefanpenner/ember-moment) ([license](https://github.com/stefanpenner/ember-moment/blob/master/LICENSE.md))
- [ember-can 0.8.1](https://github.com/minutebase/ember-can) ([license](https://github.com/minutebase/ember-can/blob/master/LICENSE.md))
- [ember-body-class 0.3.9](https://github.com/AddJam/ember-body-class) ([license](https://github.com/AddJam/ember-body-class/blob/master/LICENSE.md))
- [ember-cli-document-title 0.3.1](https://github.com/kimroen/ember-cli-document-title) ([license](https://github.com/kimroen/ember-cli-document-title/blob/master/LICENSE.md))
- [ember-cli-clipboard 0.4.1](https://github.com/jkusa/ember-cli-clipboard) ([license](https://github.com/jkusa/ember-cli-clipboard/blob/master/LICENSE.md))
- [ember-truth-helpers 1.2.0](https://github.com/jmurphyau/ember-truth-helpers) ([license](https://github.com/jmurphyau/ember-truth-helpers/blob/master/LICENSE.md))
- [ember-composable-helpers 1.1.1](https://github.com/DockYard/ember-composable-helpers) ([license](https://github.com/DockYard/ember-composable-helpers/blob/master/LICENSE.md))
- [ember-data-route 0.2.0](https://github.com/DockYard/ember-data-route) ([license](https://github.com/DockYard/ember-data-route/blob/master/LICENSE.md))
- [ember-cli-autoprefixer 0.6.0](https://github.com/kimroen/ember-cli-autoprefixer) ([license](https://github.com/kimroen/ember-cli-autoprefixer/blob/master/LICENSE.md))
- [ember-data-fastboot-route 0.1.0](https://github.com/Gavant/ember-data-fastboot-route) ([license](https://github.com/Gavant/ember-data-fastboot-route/blob/master/LICENSE.md))
- [ember-cookies 0.0.9](https://github.com/simplabs/ember-cookies) ([license](https://github.com/simplabs/ember-cookies/blob/master/LICENSE))
- [ember-data-model-fragments 2.3.2](https://github.com/lytics/ember-data-model-fragments) ([license](https://github.com/lytics/ember-data-model-fragments/blob/master/LICENSE))
- [ember-ajax 2.0.1](https://github.com/ember-cli/ember-ajax) ([license](https://github.com/ember-cli/ember-ajax/blob/master/LICENSE.md))
- [ember-cli-app-version 1.0.0](https://github.com/embersherpa/ember-cli-app-version) ([license](https://github.com/EmberSherpa/ember-cli-app-version/blob/master/LICENSE.md))
- [ember-cli-babel 5.1.6](https://github.com/babel/ember-cli-babel) ([license](https://github.com/babel/ember-cli-babel/blob/master/LICENSE))
- [ember-cli-dependency-checker 1.2.0](https://github.com/mixonic/ember-cli-dependency-checker) ([license](https://github.com/mixonic/ember-cli-dependency-checker/blob/master/LICENSE))
- [ember-cli-eslint 1.6.0](https://github.com/ember-cli/ember-cli-eslint) ([license](https://github.com/ember-cli/ember-cli-eslint/blob/master/LICENSE.md))
- [ember-cli-htmlbars 1.0.3](https://github.com/ember-cli/ember-cli-htmlbars) ([license](https://github.com/ember-cli/ember-cli-htmlbars/blob/master/LICENSE.md))
- [ember-cli-htmlbars-inline-precompile 0.3.1](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile) ([license](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/blob/master/LICENSE.md))
- [ember-cli-inject-live-reload 1.4.0](https://github.com/rwjblue/ember-cli-inject-live-reload) ([license](https://github.com/rwjblue/ember-cli-inject-live-reload/blob/master/LICENSE.md))
- [ember-cli-moment-shim 2.0.0](https://github.com/jasonmit/ember-cli-moment-shim) ([license](https://github.com/jasonmit/ember-cli-moment-shim/blob/master/LICENSE.md))
- [ember-cli-qunit 1.4.0](https://github.com/ember-cli/ember-cli-qunit) ([license](https://github.com/ember-cli/ember-cli-qunit/blob/master/LICENSE.md))
- [ember-cli-release 0.2.9](https://github.com/lytics/ember-cli-release) ([license](https://github.com/lytics/ember-cli-release/blob/master/LICENSE.md))
- [ember-cli-sass 5.3.1](https://github.com/aexmachina/ember-cli-sass) ([license](https://github.com/aexmachina/ember-cli-sass/blob/master/LICENSE.md))
- [ember-cli-sri 2.1.0](https://github.com/jonathanKingston/ember-cli-sri) ([license](https://github.com/jonathanKingston/ember-cli-sri/blob/master/LICENSE.md))
- [ember-cli-uglify 1.2.0](https://github.com/ember-cli/ember-cli-uglify) ([license](https://github.com/ember-cli/ember-cli-uglify/blob/master/LICENSE.md))
- [ember-export-application-global 1.0.5](https://github.com/ember-cli/ember-export-application-global) ([license](https://github.com/ember-cli/ember-export-application-global/blob/master/LICENSE.md))
- [ember-load-initializers 0.5.1](https://github.com/ember-cli/ember-load-initializers) ([license](https://github.com/ember-cli/ember-load-initializers/blob/master/LICENSE.md))
- [ember-resolver 2.0.3](https://github.com/ember-cli/ember-resolver) ([license](https://github.com/ember-cli/ember-resolver/blob/master/LICENSE.md))
- [Pretender 1.1.0](https://github.com/pretenderjs/pretender) ([license](https://github.com/pretenderjs/pretender/blob/master/LICENSE))
- [faker.js 3.1.0](https://github.com/marak/Faker.js/) ([license](https://github.com/Marak/faker.js/blob/master/MIT-LICENSE.txt))
- [broccoli-asset-rev 2.4.2](https://github.com/rickharrison/broccoli-asset-rev) ([license](https://github.com/rickharrison/broccoli-asset-rev/blob/master/LICENSE))
- [broccoli-funnel 1.0.3](https://github.com/broccolijs/broccoli-funnel) ([license](https://github.com/broccolijs/broccoli-funnel/blob/master/LICENSE))
- [glob 4.5.3](https://github.com/isaacs/node-glob) ([license](https://github.com/isaacs/node-glob/blob/master/LICENSE))
- [loader.js 4.0.1](https://github.com/ember-cli/loader.js) ([license](https://github.com/ember-cli/loader.js/blob/master/LICENSE.md))
- [morgan 1.7.0](https://github.com/expressjs/morgan) ([license](https://github.com/expressjs/morgan/blob/master/LICENSE))
- [babel-cli 6.11.4](https://babeljs.io/) ([license](https://github.com/babel/babel/blob/master/LICENSE))
- [babel-core 6.10.4](https://babeljs.io/) ([license](https://github.com/babel/babel/blob/master/LICENSE))
- [babel-preset-es2015-node5 1.2.0](https://github.com/alekseykulikov/babel-preset-es2015-node5) ([license](https://github.com/alekseykulikov/babel-preset-es2015-node5/blob/master/LICENSE))
- [fastboot-app-server 1.0.0-rc.3](https://github.com/ember-fastboot/fastboot)
- [fastboot-fs-notifier 0.1.1](https://github.com/iheanyi/fastboot-fs-notifier)
- [node-fetch 1.6.0](https://github.com/bitinn/node-fetch) ([license](https://github.com/bitinn/node-fetch/blob/master/LICENSE.md))

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
