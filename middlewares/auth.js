const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

function auth(req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		req.user = null;
		return next();
	}
	try {
		const verifyResult = jwt.verify(token, JWT_SECRET);

		req.user = {
			email: verifyResult.email,
		};

		next();
	} catch (e) {
		console.error('Token verification failed:', e);
		req.user = null;
		next();
	}
}

module.exports = auth;
