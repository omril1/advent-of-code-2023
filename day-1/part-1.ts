import * as fs from 'node:fs';

const input: string = fs.readFileSync('./day-1/input.txt', 'utf8');
const lines = input.split('\n');
const digits = lines.map(line => line.split('').filter(char => /\d/.test(char)).map(Number));
const firstAndLastTuple = digits.map(digit => [digit[0], digit.at(-1)]);
const firstAndLastAsNumber = firstAndLastTuple.map(tuple => Number(String(tuple[0]) + String(tuple[1])));
const sum = firstAndLastAsNumber.reduce((acc, curr) => acc + curr, 0);

console.log({ sum });