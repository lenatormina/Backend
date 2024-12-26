const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	problemDescription: { type: String, required: false },
	createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
