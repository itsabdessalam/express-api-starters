const db = require('../database');
const ObjectId = require('mongodb').ObjectId;
const collectionName = 'users';

module.exports = {
	// Lists all users
	index: (req, res) => {
		const collection = db.getdb().collection(collectionName);
		collection
			.find({})
			.toArray()
			.then((data) => {
				res.status(200).json({
					count: data.length,
					users: data
				});
			})
			.catch((err) => {
				res.status(500).json({
					error: err
				});
			});
	},

	// Creates user
	store: (req, res) => {
		const { firstName, lastName, address, phones } = req.body,
			user = {
				firstName,
				lastName,
				address,
				phones
			},
			collection = db.getdb().collection(collectionName);
		collection
			.insertOne(user)
			.then(() => {
				res.status(201).json(user);
			})
			.catch((err) => {
				res.status(500).json({
					error: err
				});
			});
	},

	// Deletes user
	destroy: (req, res) => {
		const id = req.params.id,
			collection = db.getdb().collection(collectionName);
		collection
			.deleteOne({ _id: ObjectId(id) })
			.then((data) => {
				if (data.result.n < 1) {
					res.status(404).json({
						message: 'User not found'
					});
				} else {
					res.status(204).json({});
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},

	// Edits user
	update: (req, res) => {
		const id = req.params.id,
			body = req.body;
		const collection = db.getdb().collection(collectionName);
		collection
			.updateOne({ _id: ObjectId(id) }, { $set: body })
			.then((data) => {
				if (data.result.n < 1) {
					res.status(404).json({
						message: 'User not found'
					});
				} else if (data.result.nModified < 1) {
					res.status(200).json({
						message: 'No changes found'
					});
				} else {
					res.status(202).json(user);
				}
			})
			.catch((err) => {
				res.status(500).json({
					error: err
				});
			});
	},

	// Gets user
	show: (req, res) => {
		const id = req.params.id;
		const collection = db.getdb().collection(collectionName);
		collection
			.findOne({ _id: ObjectId(id) })
			.then((data) => {
				if (data) {
					res.status(200).json({
						user: data
					});
				} else {
					res.status(404).json({
						message: 'User not found'
					});
				}
			})
			.catch((err) => {
				res.status(500).json({
					error: err
				});
			});
	},

	// Searches user
	search: (req, res) => {
		const { firstname, zip } = req.query;
	}
};
