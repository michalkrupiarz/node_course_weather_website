const chalk = require('chalk');
const getNotes = require('./notes.js');
const validator = require('validator');

const command = process.argv[2];

if (command === 'add'){
    console.log(chalk.green('Action add'));
    } else if (command === 'remove'){
        console.log('Remove note');
    }

console.log(process.argv);