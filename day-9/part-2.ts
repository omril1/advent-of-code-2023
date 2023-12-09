import * as fs from 'node:fs';

// const input = `
// 0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45
// `.trim();
const input: string = fs.readFileSync('./day-9/input.txt', 'utf8');

const lines = input.split('\n');
const values = lines.map((line) => line.split(' ').map(Number));

console.log({ values })

function processLineValues(nums: number[]) {
    console.log(...nums);
    let count = 0;
    let firstNums = [nums[0]];
    while (nums.some(n => n !== 0)) {
        const nextNums = [];
        for (let i = 0; i < nums.length - 1; i++) {
            nextNums.push(nums[i + 1] - nums[i]);
        }
        console.log(...nextNums);
        firstNums.push(nextNums[0]);
        nums = nextNums;
        count++;
    }
    return firstNums;
}

let sumOfResults = 0;
for (const line of values) {
    const firstNums = processLineValues(line);
    let alternatingSum = 0;
    for (let i = 0; i < firstNums.length; i++) {
        alternatingSum += (i % 2 === 0 ? 1 : -1) * firstNums[i];
    }
    sumOfResults += alternatingSum;
    console.log({ firstNums, alternatingSum });
}

console.log('solution', { sumOfResults });
