import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
    attributeBindings: ['type', 'multiple', 'accept'],

    filesDidChange(files) {
        this.attrs.onChange(files);
    }
});
