import * as fs from 'node:fs';

// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;
const input: string = fs.readFileSync('./day-3/input.txt', 'utf8');

const rows = input.split('\n');

function getNeighbors(i: number, j: number, matchLength: number) {
    const neighbors: string[] = [];
    let gearCoordinates: [number, number] | null = null;
    for (let ki = i - 1; ki <= i + 1; ki++) {
        for (let kj = j - 1; kj < j + matchLength + 1; kj++) {
            if (ki === i && kj >= j && kj < j + matchLength) {
                continue;
            }
            const value = rows[ki]?.[kj];
            if (value === '*') {
                gearCoordinates = [ki, kj];
            }
            neighbors.push(value);
        }
    }
    return {
        neighbors: neighbors.filter(Boolean),
        gearCoordinates,
    };
}

let sum = 0;
const partNumbers = [];
const partTouchingGear = new Map<`${number}-${number}`, number>();

for (let i = 0; i < rows.length; i++) {
    const consecutiveDigits = /\d+/g;
    const row = rows[i];
    let match: RegExpExecArray | null = null;
    while (match = consecutiveDigits.exec(row)) {
        const value = Number(match[0]);
        const index = match.index;
        const matchLength = match[0].length;
        const { neighbors, gearCoordinates } = getNeighbors(i, index, matchLength);
        if (gearCoordinates) {
            const key = `${gearCoordinates[0]}-${gearCoordinates[1]}` as const;
            if (partTouchingGear.has(key)) {
                const gearRatio = partTouchingGear.get(key)! * value;
                sum += gearRatio;
                partNumbers.push(partTouchingGear.get(key)!);
            }
            partTouchingGear.set(key, value);
        }
        console.log({ value, match, neighbors });
    }
}

console.log({ rows });
console.log({ partNumbers, sum });
