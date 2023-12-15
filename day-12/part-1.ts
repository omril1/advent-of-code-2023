import * as fs from 'node:fs';

const dummyInput = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`.trim();
// const input = dummyInput;
const input: string = fs.readFileSync('./day-12/input.txt', 'utf8');

const data = input.split('\n').map(l => {
    const [slots, pattern] = l.split(' ');
    return { slots, pattern: pattern.split(',').map(Number) };
});

// console.dir({ data }, { depth: null });

function isValid(pattern: string, slots: number[]) {
    // console.log({ pattern, slots });
    const regex = /(#+|\.+)/g;
    let match: RegExpExecArray | null = null;

    let index = 0;
    while (match = regex.exec(pattern)) {
        const subPattern = match[1];
        if (subPattern.startsWith('#')) {
            if (subPattern.length !== slots[index]) {
                // console.log('while false', subPattern, index);
                return false;
            }
            index++;
        }
    }
    const result = index === slots.length;
    // console.log({ result, index, slotsLength: slots.length });
    return result;
}

// start with the first one
const first = data[0];

// isValid('..#', [1]); // should be true
// isValid('#..#', [1, 1]); // should be true
// isValid('#..#', [1, 1, 1]); // should be false
// isValid('#.##.#', [1, 2, 1]); // should be true
// isValid('#....##....####', [1, 2, 4]); // should be true

let counter = 0;
for (let i = 0; i < first.slots.length; i++) {
    const slot = first.slots[i];
    let qCount = 0;
    let dotCount = 0;
    let hashCount = 0;
    for (let j = 0; j < first.pattern.length; j++) {
        const pattern = first.pattern[j];
        if (slot === '?') {
            qCount++;
        } else {
            if (slot === '.') {
                dotCount++;
            } else {
                hashCount++;
            }
        }
    }
    console.log({ qCount, dotCount, hashCount });
}

console.log({ counter });

// const arrangements = data.map(({ slots, pattern }) => {});

// const total = arrangements.reduce((acc, cur) => acc + cur, 0);

// console.log({ total });
