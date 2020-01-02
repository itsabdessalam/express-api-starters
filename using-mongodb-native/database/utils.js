exports.createCollections = (db, options) => {
  for (const collectionOptions in options) {
    if (options.hasOwnProperty(collectionOptions)) {
      db.createCollection(collectionOptions, options[collectionOptions]);
    }
  }
};
