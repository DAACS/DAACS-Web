import Ember from 'ember';
import Config from 'daacs/config/environment';

const {
    inject: {
        service
    },
    $: {
        param,
        extend
    }
} = Ember;

export default Ember.Mixin.create({
    ajax: service(),

    async downloadFile(url, params = {}) {
        try {
            let response = await this.get('ajax').request('download/token');
            let downloadUrl = `${Config.RESTAPI}/${url}?${param(extend(params, response.data))}`;

            window.location.href = downloadUrl;
            return downloadUrl;
        } catch(error) {
            return Ember.RSVP.reject(error);
        }
    }
});
