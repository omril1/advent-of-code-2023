import * as fs from 'node:fs';

const dummyInput = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`.trim();
// const input = dummyInput;
const input: string = fs.readFileSync('./day-11/input.txt', 'utf8');
// console.log(input);

const grid = input.split('\n').map((line) => line.split('') as ('.' | '#')[]);

function getRowsAndColumnsWithoutGalaxies() {
    const rows = [];
    const columns = [];
    for (let y = 0; y < grid.length; y++) {
        const row = grid[y];
        if (row.every((cell) => cell !== '#')) {
            rows.push(y);
        }
    }

    for (let x = 0; x < grid[0].length; x++) {
        const column = grid.map((row) => row[x]);
        if (column.every((cell) => cell !== '#')) {
            columns.push(x);
        }
    }
    return { rows, columns };
}

const rowsAndColumnsWithoutGalaxies = getRowsAndColumnsWithoutGalaxies();

console.log({ rowsAndColumnsWithoutGalaxies });

function getGalaxies() {
    const galaxies = [];
    for (let y = 0; y < grid.length; y++) {
        const row = grid[y];
        for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            if (cell === '#') {
                galaxies.push({ x, y });
            }
        }
    }
    return galaxies;
}

const galaxies = getGalaxies();

// console.log({ galaxies });

function expandGalaxies(by: number) {
        for (let y = rowsAndColumnsWithoutGalaxies.rows.length - 1; y >= 0; y--) {
            const galaxiesBeyondY = galaxies.filter((galaxy) => galaxy.y > rowsAndColumnsWithoutGalaxies.rows[y]);
            for (const galaxy of galaxiesBeyondY) {
                galaxy.y += by - 1;
            }
        }
        for (let x = rowsAndColumnsWithoutGalaxies.columns.length - 1; x >= 0; x--) {
            const galaxiesBeyondX = galaxies.filter((galaxy) => galaxy.x > rowsAndColumnsWithoutGalaxies.columns[x]);
            for (const galaxy of galaxiesBeyondX) {
                galaxy.x += by - 1;
            }
        }
}

console.log(grid.map((row) => row.join('')).join('\n'));
console.log(grid.length, 'x', grid[0].length, '\n');

expandGalaxies(1_000_000);
console.log('After expanding');
console.log({ galaxies });

function getGalaxyPairs() {
    const pairs = [];
    for (let i = 0; i < galaxies.length; i++) {
        const galaxy1 = galaxies[i];
        for (let j = i + 1; j < galaxies.length; j++) {
            const galaxy2 = galaxies[j];
            pairs.push({ galaxy1, galaxy2 });
        }
    }
    return pairs;
}

const galaxyPairs = getGalaxyPairs();

console.log({ galaxyPairs: galaxyPairs.length });

function taxicabDistance(galaxy1: { x: number; y: number }, galaxy2: { x: number; y: number }) {
    return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
}

function getGalaxyPairDistances() {
    const distances = [];
    for (const { galaxy1, galaxy2 } of galaxyPairs) {
        distances.push({ galaxy1, galaxy2, distance: taxicabDistance(galaxy1, galaxy2) });
    }
    return distances;
}

const galaxyPairDistances = getGalaxyPairDistances();

const sumOfDistances = galaxyPairDistances.map(({ distance }) => distance).reduce((a, b) => a + b, 0);

console.log({ sumOfDistances });
