import Ember from 'ember';
import ModalDialog from 'daacs/mixins/modal-dialog';

export default Ember.Controller.extend(ModalDialog, {
    actions: {
        async submit(hasAgreed) {
            this.get('session.user').set('hasDataUsageConsent', hasAgreed);
            await this.get('session.user').save();
            this.closeModal();
        }
    }
});
