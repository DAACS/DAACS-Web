import Ember from 'ember';

export default Ember.Mixin.create({
    hasFileApi: Ember.computed(function() {
        return Modernizr.filereader;
    }),

    /**
     * Reads the contents of a File object from a FileList
     *
     * @param {File} file
     * @param {string} readAs text|dataURL|arrayBuffer|binaryString
     * @return {Promise} A promise that resolves with the file contents
     */
    readFile(file, readAs = 'text') {
        return new Ember.RSVP.Promise((resolve, reject) => {
            if(!file || !this.get('hasFileApi')) {
                return reject();
            }

            const reader = new FileReader();

            reader.onerror = () => {
                return reject();
            };

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader[`readAs${Ember.String.capitalize(readAs)}`](file);
        });
    }
});
