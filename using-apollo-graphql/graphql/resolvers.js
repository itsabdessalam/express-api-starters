const User = require('../models/user');
// const mongoose = require('mongoose');
const resolvers = {
	Query: {
		allUser: () => User.find({}),
		user: (root, { id }) => {
			return User.findOne({ _id: id });
		}
	},

	Mutation: {
		addUser: (root, args) => {
			const user = new User(args);
			return user.save();
		}
	}
};

module.exports = resolvers;
