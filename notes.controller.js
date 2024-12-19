const chalk = require('chalk');
const Note = require('./models/Note.js');

async function addNote(title, owner) {
	await Note.create({ title, owner });
	console.log(chalk.bgGreen('Note was added!'));
}

async function getNotes() {
	const notes = await Note.find();
	return notes;
}

async function removeNote(id, owner) {
	const result = await Note.deleteOne({ _id: id, owner });

	if (result.matchedCount === 0) {
		throw new Error('No note to delete');
	}

	console.log(chalk.bgGreen('Note was removed!'));
}

async function updateNote(noteData, owner) {
	const result = await Note.updateOne(
		{ _id: noteData.id, owner },
		{ title: noteData.title },
	);

	if (result.matchedCount === 0) {
		throw new Error('No note to edit');
	}

	console.log(chalk.bgGreen('Note was updated!'));
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	updateNote,
};
