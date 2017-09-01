import Ember from 'ember';
import ModalDialog from 'daacs/mixins/modal-dialog';

export default Ember.Controller.extend(ModalDialog, {
    hasReadingPassage: Ember.computed.equal('model.itemContent.question.itemContentType', 'PASSAGE')
});
