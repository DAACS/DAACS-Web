export function initialize(applicationInstance) {
    let fastboot = applicationInstance.lookup("service:fastboot");
    if (fastboot && fastboot.get("isFastBoot")) {
        let store = applicationInstance.lookup("service:store");
        let shoebox = applicationInstance
            .lookup("service:fastboot")
            .get("shoebox");
        shoebox.put("ember-data-store", {
            get records() {
                let data = {};
                // Get all model types in the store
                let types = Object.keys(
                    store.typeMaps ? store.typeMaps : {}
                ).map((k) => {
                    return store.typeMaps[k].type.modelName;
                });

                types.forEach((type) => {
                    // For each type, grab the serializer
                    let serializer = store.serializerFor(type);
                    // Add records under typename in data object
                    data[type] = store
                        .peekAll(type)
                        .toArray()
                        .reduce((a, b) => a.concat(b), [])
                        .map((record) => {
                            // Serialize the record and recieve json
                            return serializer.serialize(
                                record._createSnapshot(),
                                { includeId: true }
                            );
                        });
                });
                // Return the data so Fastboot can add it to the shoebox
                return data;
            },
        });
    }
}

export default {
    name: "fastboot-data-store",
    initialize,
};
