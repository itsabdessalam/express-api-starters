const User = require('../models/User');

module.exports = {
	// Lists all users
	index: (req, res) => {
		User.find({}).exec((err, users) => {
			if (err) {
				throw err;
			}
			res.status(200).json(users);
		});
	},

	// Creates user
	store: (req, res) => {
		const { firstName, lastName, address, phones } = req.body;
		const user = new User({
			firstName,
			lastName,
			address,
			phones
		});
		user.save((err) => {
			if (err) {
				throw error;
			}
			res.status(201).json(user);
		});
	},

	// Deletes user
	destroy: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				throw err;
			}
			user.remove((err) => {
				if (err) {
					throw err;
				}
				res.status(204).json({});
			});
		});
	},

	// Edits user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			const body = req.body;

			user.firstName = body.firstName;
			user.lastName = body.lastName;
			user.address = body.address;
			user.phones = body.phones;

			user.save((err) => {
				if (err) {
					throw err;
				}
				res.status(202).json(user);
			});
		});
	},

	// Gets user
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				throw err;
			}
			res.status(200).json(user);
		});
	},

	// Searches user
	search: (req, res) => {
		const { firstname, zip } = req.query;
		User.find({ firstName: new RegExp(firstname, 'i'), 'address.zip': zip }).exec((err, users) => {
			if (err) {
				throw err;
			}
			res.status(200).json(users);
		});
	}
};
