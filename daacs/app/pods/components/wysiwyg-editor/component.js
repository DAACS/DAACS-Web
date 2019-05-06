import Ember from 'ember';
import Config from 'daacs/config/environment';

const {
    get,
    set,
    tryInvoke,
    run: {
        bind
    },
    inject: {
        service
    }
} = Ember;

export default Ember.Component.extend({
    session: service(),
    classNames: ['wysiwyg-editor'],
    height: 200,
    content: '<p></p>',
    allowFullscreen: true,

    didInsertElement() {
        this._super(...arguments);
        const editor = new Jodit(`#wysiwyg-textarea-${get(this, 'elementId')}`, {
            //http://docs.mathjax.org/en/latest/options/preprocessors/tex2jax.html (ignoreClass config)
            editorCssClass: 'tex2jax_ignore',
            height: get(this, 'height'),
            removeButtons: !get(this, 'allowFullscreen') ? ['fullsize'] : [],
            toolbarSticky: false,
            sourceEditorNativeOptions: {
                theme: 'ace/theme/github'
            },
            uploader: {
                url: `${Config.RESTAPI}/files`,
                format: 'json',
                imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
                headers: {
                    Authorization: `Bearer ${get(this, 'session.data.authenticated.access_token')}`
                },
                prepareData(formdata) {
                    formdata.append('image', formdata.getAll('files[0]')[0]);
                    formdata.delete('files[0]');
                },
                process(response) {
                    return {
                        files: [get(response, 'data')],
                        error: get(response, 'errors.firstObject.detail'),
                        path: '',
                        baseurl: '',
                        msg: null
                    };
                },
                isSuccess(response) {
                    return !get(response, 'error');
                }
            }
        });

        editor.setEditorValue(get(this, 'content') || "");
        editor.events.on('change', bind(this, 'contentChanged'));
        set(this, 'editor', editor);
    },

    contentChanged(content) {
        tryInvoke(this.attrs, 'onChange', [content]);
    }
});
