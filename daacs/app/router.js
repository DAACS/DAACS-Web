import Ember from 'ember';
import config from './config/environment';

const {
    get,
    run: { scheduleOnce },
    inject: { service }
} = Ember;

const Router = Ember.Router.extend({
    location: config.locationType,
    userEvents: service('user-events'),

    didTransition() {
        this._super(...arguments);
        scheduleOnce('afterRender', this, '_trackPage');
    },

    _trackPage() {
        const url = this.get('url');
        const title = get(this, 'userEvents').getPageTitle();
        get(this, 'userEvents').logEvent('PAGE_VIEW', { url, title });
    }
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('about');
    this.route('login');
    this.route('dashboard');
    this.route('assessments', {path: '/assessments/:assessment_category'},  function() {
        this.route('domain', function() {
            this.route('index', {path: '/:domain_id'}),
            this.route('subdomain', {path: '/:domain_id/subdomain/:subdomain_id'});
        });
        this.route('start');
        this.route('take');
    });
    this.route('admin', function() {
        this.route('ungraded-assessments', function() {
            this.route('assessment', {path: '/:user_assessment_id/:user_id'});
        });
        this.route('manage-assessments', function() {
            this.route('assessment', {path: '/:assessment_id'}, function() {
                this.route('general');
                this.route('content');
                this.route('rubric');
                this.route('domains');
                this.route('questions');
            });
            this.route('new', function() {
                this.route('general');
                this.route('content');
                this.route('rubric');
                this.route('domains');
                this.route('questions');
            });
        });
    });
    this.route('password', function() {
        this.route('forgot');
        this.route('reset');
    });
    this.route('authenticating');
    this.route('fourOhThree', {path: '/403'});
    this.route('fourOhFour', {path: '/*path'});
});

export default Router;
