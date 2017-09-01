export function initialize(application) {
    application.inject('ability', 'session', 'service:session');
}

export default {
    name: 'abilities',
    initialize
};
