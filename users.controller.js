const User = require('./models/User.js');

async function addUser(email, password) {
	User.create({ email, password });
}

module.exports = {
	addUser,
};
