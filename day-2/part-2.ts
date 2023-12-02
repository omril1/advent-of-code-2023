import * as fs from 'node:fs';

// const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
const input: string = fs.readFileSync('./day-2/input.txt', 'utf8');

const lines = input.split('\n');
const rounds = lines.map((line) => {
    const [game, turns] = line.split(': ');
    const gameNumber = Number(game.slice(5));
    const round = turns.split(';');
    return { gameNumber, turns, rounds: round.map(game => game.split(',').map(colorAndNumber => {
        const [number, color] = colorAndNumber.trim().split(' ');
        return { number: Number(number), color };
    })) };
});

// 12 red, 13 green, and 14 blue
let sum = 0;
for (const round of rounds) {
    let redMax = 0;
    let greenMax = 0;
    let blueMax = 0;
    round.rounds.forEach(internalRounds => internalRounds.forEach(internalRound => {
        if (internalRound.color === 'red') {
            redMax = Math.max(redMax, internalRound.number);
        }
        if (internalRound.color === 'green') {
            greenMax = Math.max(greenMax, internalRound.number);
        }
        if (internalRound.color === 'blue') {
            blueMax = Math.max(blueMax, internalRound.number);
        }
    }))
    const power = redMax * greenMax * blueMax;
    sum += power;
}

console.dir({ sum }, { depth: null });