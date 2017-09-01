import Ember from 'ember';

export function renderHtml(params) {
  return Ember.String.htmlSafe(params[0]);
}

export default Ember.Helper.helper(renderHtml);
