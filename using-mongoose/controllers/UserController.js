const User = require('../models/User');

module.exports = {
	// Lists all users
	index: (req, res) => {
		// Example with Promise
		// User.find({})
		//     .then((err, users) => {
		//         res.status(200).json({
		//             count: users.length,
		//             users: users
		//         });
		//     })
		//     .catch((err) => {
		//         res.status(500).json({
		//             error: err
		//         });
		//     });
		User.find({}).exec((err, users) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}
			res.status(200).json({
				count: users.length,
				users: users
			});
		});
	},

	// Creates user
	store: (req, res, next) => {
		const { firstName, lastName, address, phones } = req.body;
		const user = new User({
			firstName,
			lastName,
			address,
			phones
		});
		user.save((err) => {
			if (err) {
				res.status(500).json({
					errors: err
				});
				return;
			}

			res.status(201).json(user);
		});
	},

	// Deletes user
	destroy: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}

			user.remove((err) => {
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
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
					res.status(500).json({
						error: err
					});
					return;
				}

				res.status(202).json(user);
			});
		});
	},

	// Gets user
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}

			res.status(200).json(user);
		});
	},

	// Searches user
	search: (req, res) => {
		const { firstname, zip } = req.query;
		User.find({ firstName: new RegExp(firstname, 'i'), 'address.zip': zip }).exec((err, users) => {
			if (err) {
				res.status(500).json({
					error: err
				});
				return;
			}

			res.status(200).json({
				count: users.length,
				users
			});
		});
	}
};
