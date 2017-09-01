export function initialize(application) {
    [
        'component',
        'controller',
        'model',
        'route',
        'view'
    ].forEach(type => {
        application.inject(type, 'session', 'service:session');
    });
}

export default {
  name: 'session',
  after: 'ember-simple-auth',
  initialize
};
