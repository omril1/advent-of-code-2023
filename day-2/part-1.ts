import * as fs from 'node:fs';

const input: string = fs.readFileSync('./day-2/input.txt', 'utf8');
// Game 1: 7 blue, 6 green, 3 red; 3 red, 5 green, 1 blue; 1 red, 5 green, 8 blue; 3 red, 1 green, 5 blue

const lines = input.split('\n');
const rounds = lines.map((line) => {
    const [game, turns] = line.split(': ');
    const gameNumber = Number(game.slice(5));
    const round = turns.split(';');
    return { gameNumber, rounds: round.map(game => game.split(',').map(colorAndNumber => {
        const [number, color] = colorAndNumber.trim().split(' ');
        return { number: Number(number), color };
    })) };
});

// 12 red, 13 green, and 14 blue
let sum = 0;
for (const round of rounds) {
    const allRoundsArePossible = round.rounds.every(internalRounds => internalRounds.every(internalRound => {
        if (internalRound.color === 'red' && internalRound.number <= 12) return true;
        if (internalRound.color === 'green' && internalRound.number <= 13) return true;
        if (internalRound.color === 'blue' && internalRound.number <= 14) return true;
        return false;
    }))
    if (allRoundsArePossible) {
        sum += round.gameNumber;
    }
}

console.dir({ rounds, sum }, { depth: null });