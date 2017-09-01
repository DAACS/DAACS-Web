import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'label',
    classNames: ['file-upload-input'],
    allowMultiple: false,
    accept: null,
    selectedFiles: null,

    selectedFileText: Ember.computed('selectedFiles', function() {
        const files = this.get('selectedFiles');

        if(!Ember.isArray(files) || Ember.isEmpty(files)) {
            return null;
        }

        //the files variable is a FileList object not a real Array,
        //so we can't directly use array methods on it
        return Array.prototype.map.call(files, file => file.name).join(', ');
    }),

    actions: {
        onFileChange(files) {
            this.set('selectedFiles', files);

            if(this.attrs.onChange) {
                this.attrs.onChange(files);
            }
        }
    }
});
