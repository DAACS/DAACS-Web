import Ember from 'ember';

const {
    get,
    set,
    inject: { service },
    RSVP: { reject }
} = Ember;

export default Ember.Controller.extend({
    ajax: service(),
    notify: service(),

    queryParams: [
        'classId',
        'userId'
    ],

    actions: {
        async acceptInvite() {
            try {
                let request = await get(this, 'ajax').request('class-invite/accept', {
                    method: 'PUT',
                    data: get(this, 'ajax').stringifyData({
                        classId: get(this, 'classId'),
                        userId: get(this, 'userId')
                    })
                });

                get(this, 'notify').success(get(this, 'i18n').t('classes.classInvite.acceptedSuccessfully'));
                this.transitionToRoute('dashboard');

                return request;
            } catch(errors) {
                set(this, 'submitError', errors);
                return reject(errors);
            }
        }
    }
});
