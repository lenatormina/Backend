const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { loginUser } = require('./users.controller.js');
const { addApplication, getApplications } = require('./applications.controller.js');
const auth = require('./middlewares/auth');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(auth);

app.get('/login', async (req, res) => {
	res.render('login', {
		title: 'Login',
		error: undefined,
	});
});

app.post('/login', async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);
		res.cookie('token', token, { httpOnly: true });
		res.redirect('/');
	} catch (e) {
		res.render('login', {
			title: 'Login',
			error: e.message,
		});
	}
});

app.get('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true });
	res.redirect('/');
});

app.get('/apply', auth, (req, res) => {
	res.render('apply', {
		title: 'Запись к врачу',
		error: undefined,
	});
});

app.post('/apply', auth, async (req, res) => {
	try {
		await addApplication(
			req.body.fullName,
			req.body.phoneNumber,
			req.body.problemDescription,
		);
		res.render('apply', {
			title: 'Запись к врачу',
			success: 'Заявка создана!',
			error: undefined,
		});
	} catch (e) {
		res.render('apply', {
			title: 'Запись к врачу',
			success: undefined,
			error: e.message,
		});
	}
});

app.get('/applications', auth, async (req, res) => {
	const applications = await getApplications();
	res.render('applications', {
		title: 'Applications',
		applications,
	});
});

app.get('/', (req, res) => {
	console.log('User :', req.user);
	res.render('index', { title: 'Добро пожаловать в клинику', user: req.user });
});

mongoose
	.connect(
		'mongodb+srv://elena:qwerty123@cluster0.axn9s.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0',
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port ${port}...`));
		});
	})
	.catch((err) => {
		console.error(chalk.red('Database connection error:', err));
	});
