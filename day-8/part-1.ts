import * as fs from 'node:fs';

// const input = `
// RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)
// `.trim();
// const input = `
// LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)
// `.trim();
const input: string = fs.readFileSync('./day-8/input.txt', 'utf8');

const lines = input.split('\n');

const directions = lines[0];

const rulesMap = new Map<string, string[]>();

for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const [rule, left, right] = /(.+) = \(?(.+), (.+)\)/.exec(line)!.slice(1);
    rulesMap.set(rule, [left, right]);
}

// const startRule = lines[2].split(' ')[0];
const startRule = 'AAA';
const endRule = 'ZZZ';
let stepNumber = 0;

let currentRule = startRule;
const visited = new Set<string>();
while (currentRule !== endRule) {
    for (const direction of directions) {
        stepNumber++;
        if (stepNumber % 1000) {
            console.log({ stepNumber, currentRule, direction });
        }
        const pair = rulesMap.get(currentRule)!;
        if (currentRule === endRule) {
            break;
        }
        currentRule = pair[direction === 'R' ? 1 : 0];
        if (visited.has(currentRule)) {
            console.log('loop detected');
            break;
        }
    }
}
console.log('the end', { directions, currentRule, stepNumber });
