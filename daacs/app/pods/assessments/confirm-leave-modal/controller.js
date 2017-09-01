import Ember from 'ember';
import ModalDialog from 'daacs/mixins/modal-dialog';

export default Ember.Controller.extend(ModalDialog, {
    actions: {
        confirmLeave() {
            this.send('confirmedLoseWork', this.get('model'));
        }
    }
});
