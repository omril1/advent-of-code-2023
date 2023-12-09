import * as fs from 'node:fs';

// const input = `
// LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// `.trim();
const input: string = fs.readFileSync('./day-8/input.txt', 'utf8');

const lines = input.split('\n');

const directions = lines[0];

const rulesMap = new Map<string, string[]>();
const nodesThatEndsWithA = [];

for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const [rule, left, right] = /(.+) = \(?(.+), (.+)\)/.exec(line)!.slice(1);
    rulesMap.set(rule, [left, right]);
    if (rule.endsWith('A')) {
        nodesThatEndsWithA.push(rule);
    }
}

console.log({ rulesMap, nodesThatEndsWithA });

const gcd = (a :number, b :number): number => b == 0 ? a : gcd(b, a % b);
const lcm = (a :number, b :number) =>  a / gcd(a, b) * b;
const lcmAll = (ns :number[]) => ns.reduce(lcm, 1);

const cycleLengths = nodesThatEndsWithA.map(() => 0);
const currentNodes = nodesThatEndsWithA.slice();

let stepNumber = 0;

while (cycleLengths.some((x) => x === 0)) {
    const direction = directions[stepNumber % directions.length];
    stepNumber++;
    for (let i = 0; i < currentNodes.length; i++) {
        currentNodes[i] = rulesMap.get(currentNodes[i])![direction === 'R' ? 1 : 0];
        if (currentNodes[i].endsWith('Z')) {
            cycleLengths[i] = stepNumber;
            console.log('found cycle', { stepNumber, direction, cycleLengths, currentNodes });
        }
    }
}

const solution = lcmAll(cycleLengths); // [ 16271, 18113, 18727, 21797, 22411, 24253 ] -> 23977527174353
console.log('solution', { stepNumber, nodesThatEndsWithA, currentNodes, cycleLengths, solution });
