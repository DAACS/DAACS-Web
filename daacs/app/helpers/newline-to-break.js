import Ember from 'ember';

export function newlineToBreak(params) {
  return (typeof params[0] === 'string') ?
    Ember.String.htmlSafe(params[0].replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')) :
    '';
}

export default Ember.Helper.helper(newlineToBreak);
