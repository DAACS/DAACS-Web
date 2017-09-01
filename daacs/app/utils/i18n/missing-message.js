import Ember from 'ember';

export default function(locale, key, context) {
    //allow default text to be displayed if a translation doesn't exist
    //for example if the server returns an error code (w/no associated translation)
    //and a human-readable error string
    return !Ember.isEmpty(context.defaultText) ? context.defaultText : `Missing translation: ${key}`;
}
