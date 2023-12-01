import * as fs from 'node:fs';

// ugly because digits overlap, so need to reapply regex
const digitNameToNumber = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
} as const;

// const input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;
const input: string = fs.readFileSync('./day-1/input.txt', 'utf8');
const lines = input.split('\n')//.slice(0, 30);
const digits = lines.map(line => {
    let beforeSplit = line;
    // const beforeSplit = line.replaceAll(
    //     /(\d|one|two|three|four|five|six|seven|eight|nine)/g,
    //     r => {
    //         if (r in digitNameToNumber) {
    //             return ` ${digitNameToNumber[r as keyof typeof digitNameToNumber]} `;
    //         }
    //         return r;
    //     }
    // );
    for (const digitName of Object.keys(digitNameToNumber)) {
        const regex = new RegExp(digitName, 'g');
        beforeSplit = beforeSplit.replace(regex, digitNameToNumber[digitName as keyof typeof digitNameToNumber]);
    }
    // const beforeSplit = line.replaceAll(/(?=\d|one|two|three|four|five|six|seven|eight|nine)/g, r => ` ${r in digitNameToNumber ? digitNameToNumber[r as keyof typeof digitNameToNumber] : r} `);
    const afterSplit = beforeSplit.split(/(?!=\d)/);
    const afterFilter = afterSplit.filter(str => /\d/.test(str));
    console.log({ line, beforeSplit, afterSplit, afterFilter });
    return afterFilter.map(str => Number(str));
});
// console.dir({ digits }, { depth: null });
const firstAndLastTuple = digits.map(digit => [digit[0], digit.at(-1)!]);
// console.log({ digits, firstAndLastTuple })
const firstAndLastAsNumber = firstAndLastTuple.map(tuple => tuple[0] * 10 + tuple[1]);
const sum = firstAndLastAsNumber.reduce((acc, curr) => acc + curr, 0);

// 53885 is not correct for part 2
console.log({ sum });