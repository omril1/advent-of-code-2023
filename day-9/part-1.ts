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
    let sumOfLastNums = nums.at(-1)!;
    while (nums.some(n => n !== 0)) {
        const nextNums = [];
        for (let i = 0; i < nums.length - 1; i++) {
            nextNums.push(nums[i + 1] - nums[i]);
        }
        console.log(...nextNums);
        sumOfLastNums += nextNums.at(-1)!;
        nums = nextNums;
        count++;
    }
    return sumOfLastNums;
}

let sumOfSumOfLastNums = 0;
for (const line of values) {
    const sumOfLastNums = processLineValues(line);
    sumOfSumOfLastNums += sumOfLastNums;
    console.log({ sumOfLastNums })
}

console.log('solution', { sumOfSumOfLastNums });
