const chalk = require('chalk');
const Note = require('./models/Note.js');

async function addNote(title) {
	await Note.create({ title });
	console.log(chalk.bgGreen('Note was added!'));
}

async function getNotes() {
	const notes = await Note.find();
	return notes;
}

async function removeNote(id) {
	await Note.deleteOne({ _id: id });
	console.log(chalk.bgGreen('Note was removed!'));
}

async function updateNote(noteData) {
	await Note.updateOne({ _id: noteData.id }, { title: noteData.title });
	console.log(chalk.bgGreen('Note was updated!'));
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	updateNote,
};
