import ApplicationAdapter from 'daacs/pods/application/adapter';

export default ApplicationAdapter.extend({
    findRecord(store) {
        //need to clear all existing assessment-domain models from the store
        //before fetching an assessment with its embedded domains, because
        //domains can have non-globally unique id's, which causes two domains
        //with the same ID on different assessments to sometimes be incorrectly
        //associated with the wrong assessment, depending on load order
        store.unloadAll('assessment-domain');
        return this._super(...arguments);
    }
});
