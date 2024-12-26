const express = require('express');
const router = express.Router();
const Application = require('./models/Application.js');

async function addApplication(fullName, phoneNumber, problemDescription) {
	await Application.create({ fullName, phoneNumber, problemDescription });
}

async function getApplications() {
	return await Application.find().sort({ createdAt: -1 });
}

router.get('/apply', async (req, res) => {
	try {
		const applications = await getApplications();
		res.render('apply', { applications, success: null, error: null });
	} catch (err) {
		console.error(err);
		res.status(500).send('Ошибка сервера');
	}
});

router.post('/apply', async (req, res) => {
	const { fullName, phoneNumber, problemDescription } = req.body;

	let success = null;
	let error = null;

	try {
		if (fullName && phoneNumber && problemDescription) {
			await addApplication(fullName, phoneNumber, problemDescription);
			success = 'Заявка успешно отправлена!';
		} else {
			error = 'Пожалуйста, заполните все поля формы.';
		}

		const applications = await getApplications(); // Получаем обновленный список заявок
		res.render('apply', { applications, success, error });
	} catch (err) {
		console.error(err);
		error = 'Произошла ошибка при отправке заявки.';
		const applications = await getApplications();
		res.render('apply', { applications, success: null, error });
	}
});

module.exports = { router, addApplication, getApplications };
