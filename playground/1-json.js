const fs = require('fs');
const { json } = require('stream/consumers');

const book ={
    title:'Ego is the Enemy',
    author:'Ryan Holiday'
}

var buff = JSON.parse(fs.readFileSync('1-json.json'));
console.log(buff);

buff.age = 30;
buff.name = 'Michal';

console.log(buff);

fs.writeFileSync('1-json.json', JSON.stringify(buff));