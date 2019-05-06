import Ember from 'ember';

const {
    get,
    set,
    isArray,
    isEmpty,
    computed,
    tryInvoke
} = Ember;

export default Ember.Component.extend({
    tagName: 'label',
    classNames: ['file-upload-input'],
    allowMultiple: false,
    accept: null,
    selectedFiles: null,

    selectedFileText: computed('selectedFiles', 'filename', function() {
        const files = get(this, 'selectedFiles');
        const filename = get(this, 'filename');

        if(!isEmpty(filename)) {
            return filename;
        }

        if(!isArray(files) || isEmpty(files)) {
            return null;
        }

        //the files variable is a FileList object not a real Array,
        //so we can't directly use array methods on it
        return Array.prototype.map.call(files, file => file.name).join(', ');
    }),

    actions: {
        onFileChange(files) {
            set(this, 'selectedFiles', files);
            tryInvoke(this.attrs, 'onChange', [files]);
        }
    }
});
