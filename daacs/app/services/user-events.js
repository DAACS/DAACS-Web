import Ember from 'ember';
const {
    get,
    isNone,
    inject: { service }
} = Ember;

export default Ember.Service.extend({
    ajax: service(),
    session: service(),
    fastboot: service(),

    logEvent(type, data = {}) {
        //only logging events for authenticated users, and only AFTER we have loaded the current user
        //and not in fastboot (so we dont get duplicate events for page views)
        if(!this.get('session.isAuthenticated') || !this.get('session.user') || this.get('fastboot.isFastBoot')) {
            return;
        }

        //append the browser user agent, if avaialble
        if(!isNone(navigator) && get(navigator, 'userAgent')) {
            data['User-Agent'] = get(navigator, 'userAgent');
        }

        return this.get('ajax').request('user-events', {
            method: 'POST',
            data: this.get('ajax').stringifyData({
                eventType: type,
                eventData: data
            })
        });
    },

    getPageTitle() {
        return this.get('fastboot.isFastBoot') ? null : document.title;
    }
});
