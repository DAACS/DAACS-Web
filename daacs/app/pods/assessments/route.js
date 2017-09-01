import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';

export default AuthenticatedRoute.extend({
    actions: {
        openCheatSheetDialog(model) {
            this.send(
                'openModal',
                'assessments/cheat-sheet-modal',
                model,
                'assessments/cheat-sheet-modal'
            );
        },

        openHelpDialog(model) {
            this.send(
                'openModal',
                'assessments/request-help-modal',
                model,
                'assessments/request-help-modal'
            );

            //make sure the help modal form is reset
            this.controllerFor('assessments/request-help-modal').resetForm();
        }
    }
});
