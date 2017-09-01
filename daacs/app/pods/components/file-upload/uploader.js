import EmberUploader from 'ember-uploader';

export default EmberUploader.Uploader.extend({
    namedFileParams: false,

    createFormData (files, extra = {}) {
        if(!this.get('namedFileParams')) {
            return this._super(...arguments);
        }

        const formData = new FormData();

        for (const prop in extra) {
            if (extra.hasOwnProperty(prop)) {
                formData.append(this.toNamespacedParam(prop), extra[prop]);
            }
        }

        for(const paramName in files) {
            if(files.hasOwnProperty(paramName)) {
                formData.append(this.toNamespacedParam(paramName), files[paramName]);
            }
        }

        return formData;
    }
});
