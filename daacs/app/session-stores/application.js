import Ember from 'ember';
import Cookie from 'ember-simple-auth/session-stores/cookie';

export default Cookie.extend({
    cookies: Ember.inject.service(),
    _secureCookies: Ember.computed(function () {
      if (this.get('_fastboot.isFastBoot')) {
        return this.get('_fastboot._fastbootInfo.request.protocol') === 'https';
      } else {
        return window.location.protocol === 'https:';
      }
    }).volatile()
});
