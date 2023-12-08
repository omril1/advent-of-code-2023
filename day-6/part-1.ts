import * as fs from 'node:fs';

// const input = `
// Time:      7  15   30
// Distance:  9  40  200`.trim();
const input: string = fs.readFileSync('./day-6/input.txt', 'utf8');

const [times, distances] = input.split('\n').map((line) => line.split(/:\s+/)[1].split(/\s+/).map(Number));

const winningTimes = [];

for (let i = 0; i < times.length; i++) {
    const raceTime = times[i];
    const raceTrackDistance = distances[i];

    console.log('race', i + 1, { t: raceTime, d: raceTrackDistance });

    const winningTime = [];
    for (let speed = 0; speed < raceTime; speed++) {
        const timeRemaining = raceTime - speed;
        const distanceTraveled = speed * timeRemaining;
        if (distanceTraveled > raceTrackDistance) {
            console.log({ time: raceTime, distance: raceTrackDistance, speed, timeRemaining, distanceTraveled });
            winningTime.push(speed);
        }
    }
    winningTimes.push(winningTime);
}

console.log({ winningTimes: winningTimes.map(wt => wt.length), multiplied: winningTimes.reduce((product, wt) => product * wt.length, 1) });
