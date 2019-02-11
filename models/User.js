const mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	firstName: String,
	lastName: String,
	address: [
		{
			street: String,
			city: String,
			zip: String
		}
	],
	phones: [
		{
			label: String,
			value: String,
			zip: String
		}
	]
});
