const mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	address: {
		street: String,
		city: {
			type: String,
			required: true
		},
		zip: {
			type: String,
			required: true
		}
	},
	phones: [
		{
			label: String,
			value: {
				type: String,
				required: true
			}
		}
	]
});
