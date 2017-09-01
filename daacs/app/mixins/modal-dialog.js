import Ember from 'ember';

export default Ember.Mixin.create({
    closeModal() {
        this.send('closeModal');
    },
    actions: {
        cancel() {
            this.closeModal();
        }
    }
});
