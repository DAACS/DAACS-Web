import AuthenticatedRoute from 'daacs/pods/authenticated-route/route';

export default AuthenticatedRoute.extend({
    redirect() {
        this.transitionTo('admin.ungraded-assessments.index');
    }
});
