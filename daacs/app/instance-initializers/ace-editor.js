import Ember from 'ember';

const { get } = Ember;

export function initialize(applicationInstance) {
    let fastboot = applicationInstance.lookup('service:fastboot');
    if(fastboot && !get(fastboot, 'isFastBoot')) {
        ace.config.set('basePath', 'assets/ace');
    }
}

export default {
  name: 'ace-editor',
  initialize
};
