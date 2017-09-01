import Ember from 'ember';

export function initialize(applicationInstance) {
    let fastboot = applicationInstance.lookup('service:fastboot');
    let shoeboxSerializer = applicationInstance.lookup('serializer:shoebox');
    let store = applicationInstance.lookup('service:store');
    if (shoeboxSerializer) {
        shoeboxSerializer.set('store', store);
    }
    Ember.Route.reopen({
        fastboot: fastboot,
        dataLoadedFromShoebox: false,
        routeNameDasherized: Ember.computed('routeName', function() {
            let routeName = this.get('routeName').replace(/\.+/g," ");
            return Ember.String.dasherize(routeName);
        }),
        shouldLoadFromShoebox: Ember.computed('fastboot.isFastBoot', 'fastboot.shoebox', 'dataLoadedFromShoebox', function() {
            if (this.get('fastboot.isFastBoot')) {
                    return false;
            } else {
                let shoebox = fastboot.get('shoebox');
                let routeName = this.get('routeNameDasherized');
                if (!shoebox) {
                    return false;
                }
                let shoeboxStore = shoebox.retrieve(routeName);
                if (!shoeboxStore) {
                    return false;
                }
                return true;
            }
        }),
        serializeShoeboxData (model) {
            let modelArray = Ember.isArray(model) ? model : Ember.A(model);

            return modelArray.reduce((a,b) => a.concat(b), [])
                .map(record => record._createSnapshot())
                .map(snapshot => shoeboxSerializer.serialize(snapshot, { includeId: true }))
                .reduce((a,b) => { a.data.push(b.data); return a; }, { data: [] });
        },
        beforeModel() {
            if (this.get('shouldLoadFromShoebox')) {
                this.setProperties({
                    normalModel: this.get('model'),
                    dataLoadedFromShoebox: true
                });
                this.set('model', this.shoeboxModel);
            } else if (this.get('normalModel')) {
                this.set('model', this.normalModel);
            }
        },
        unescapeHtml(safe) {
            return Ember.$('<div />').html(safe).text();
        },
        getShoeboxModelForRoute() {
            let shoebox = fastboot.get('shoebox');
            let routeName = this.get('routeNameDasherized');
            let records = null;

            if (!shoebox) { return; }
            let shoeboxStore = shoebox.retrieve(routeName);
            if (!shoeboxStore) { return; }

            //There should only be one key in the object
            Object.keys(shoeboxStore).forEach((key) => {
                this.set('modelName', key);
                //We need to unescape the html until https://github.com/ember-fastboot/fastboot/pull/79
                let value = this.unescapeHtml(JSON.stringify(shoeboxStore[key]));
                let array = JSON.parse(value);
                records = store.push(array);
            });
            shoebox.set(routeName, null);
            let shoeboxStoreNode = document.querySelector(`#shoebox-${routeName}`);
            shoeboxStoreNode.parentElement.removeChild(shoeboxStoreNode);

            return records;
        },
        shoeboxModel() {
            return this.getShoeboxModelForRoute();
        },
        afterModel(model) {
            let routeName = this.get('routeNameDasherized');
            let shoebox = fastboot.get('shoebox');
            let shoeboxStore = fastboot.get('shoebox').retrieve(routeName);
            //If this is in fastboot, put this routes model into a specific shoebox store so we can transfer exactly what was in the model to the correct route
            if (fastboot.get('isFastBoot') && model) {
                if (!shoeboxStore) {
                    shoeboxStore = {};
                    shoebox.put(routeName, shoeboxStore);
                }
                shoeboxStore[this.get('modelName')] = this.serializeShoeboxData(model);
            }
        },
    });
}

export default {
  name: 'fastboot-route',
  initialize: initialize
};
