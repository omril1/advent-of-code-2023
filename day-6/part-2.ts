import * as fs from 'node:fs';

// const input = `
// Time:      7  15   30
// Distance:  9  40  200`.trim();
const input: string = fs.readFileSync('./day-6/input.txt', 'utf8');

const [time, distance] = input.split('\n').map((line) => line.split(/:\s+/)[1].replaceAll(/\s+/g, '')).map(Number);

console.log({ time, distance });

let count = 0;
for (let speed = 0; speed < time; speed++) {
    const timeRemaining = time - speed;
    const distanceTraveled = speed * timeRemaining;
    if (distanceTraveled > distance) {
        count++;
    }
}

console.log({ count });