const User = require('../models/User');

module.exports = {
	// Lists all users
	index: (req, res) => {
		User.find({}).exec((err, users) => {
			if (err) {
				throw err;
			}
			res.send(users);
		});
	},

	// Creates user
	create: (req, res) => {
		const { firstName, lastName, address, phones } = req.body;
		const user = new User({
			firstName,
			lastName,
			address,
			phones
		});
		user.save((err) => {
			if (err) {
				console.log('Error on creation', err);
			}
		});
		res.send('User created !');
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
				console.log('Successfully deleted!');
			});
		});
		res.send('User deleted !');
	},

	// Edits user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			const body = req.body;

			user.firstName = body.firstName;
			user.lastName = body.lastName;
			user.address = body.address;
			user.phones = body.phones;

			user.save(function(err, user) {
				if (err) {
					throw err;
				}
				console.log('Successfuly updated!');
			});
		});
		res.send('User updated!');
	},

	// Gets user
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) {
				throw err;
			}
			res.send(user);
		});
	},

	// Searches user
	search: (req, res) => {
		const { firstname, zip } = req.query;
		User.find({})
			.where('firstName')
			.equals(new RegExp(firstname, 'i'))
			.where('address.zip')
			.equals(zip)
			.exec((err, users) => {
				if (err) {
					throw err;
				}
				res.send(users);
			});
	}
};
