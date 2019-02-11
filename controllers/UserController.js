const User = require('../models/User');

module.exports = {
	// Lists all users
	index: (req, res) => {
		User.find({}).exec((err, users) => {
			if (err) {
				throw error;
			}
			res.json(users);
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
		user.save((error) => {
			if (error) {
				console.log('Error on creation', error);
			}
		});
		res.send('User created !');
	},

	// Deletes user
	destroy: (req, res) => {
		User.findById(req.params.id, (error, user) => {
			if (error) {
				throw error;
			}
			user.remove((error) => {
				if (error) {
					throw error;
				}
				console.log('Successfully deleted!');
			});
		});
		res.send('User deleted !');
	},

	// Edits user
	update: (req, res) => {
		User.findById(req.params.id, (error, user) => {
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.address = req.body.address;

			user.save(function(error, user) {
				if (error) {
					throw error;
				}
				console.log('Successfuly updated!');
			});
		});
		res.send('User updated!');
	},

	// Gets user
	show: (req, res) => {
		User.findById(req.params.id, (error, user) => {
			if (error) {
				throw error;
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
			.exec((error, users) => {
				if (error) {
					throw error;
				}
				res.json(users);
			});
	}
};
