const MongoClient = require('mongodb').MongoClient,
	validator = require('./options'),
	utils = require('./utils'),
	state = {
		db: null
	};

module.exports = {
	connect: (url) => {
		MongoClient.connect(url, { useNewUrlParser: true })
			.then((client) => {
				console.log('🚀 Successfully connected to database !');
				return client.db();
			})
			.then(async (db) => {
				await utils.createCollections(db, validator);
				state.db = db;
			})
			.catch((err) => {
				console.log(err);
			});
	},

	getdb: () => {
		return state.db;
	},

	close: (done) => {
		if (state.db) {
			state.db.close((err, result) => {
				state.db = null;
				state.mode = null;
				done(err);
			});
		}
	}
};
