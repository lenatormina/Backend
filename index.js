// Запуск модуля - node index
// require("./module");

// const person = {
//   name: "Elena",
//   age: 22,
// };
// function getName(p) {
//   return p.name;
// }
// console.log(getName(person));

// console.log(__filename); - открытый файл
// console.log(__dirname); - папка открытого файла(директория)

// console.log(process.argv); - первый вывод - где установлена нода, второй - путь до файла

const { addNote, printNotes } = require('./notes.controller');

const pkg = require('./package.json');
const yargs = require('yargs');
yargs.version(pkg.version);
yargs.command({
	command: 'add',
	describe: 'Add a new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'Note title',
			demandOption: true,
		},
	},
	handler({ title }) {
		addNote(title);
	},
});

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	async handler() {
		printNotes();
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	builder: {
		id: {
			type: 'string',
			describe: 'Note id',
			demandOption: true,
		},
	},
	handler({ id }) {
		removeNote(id);
	},
});

yargs.parse();
