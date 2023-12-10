import * as fs from 'node:fs';

const dummyInput = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`.trim();
// const input = dummyInput;
const input: string = fs.readFileSync('./day-10/input.txt', 'utf8');
console.log(input);

// pipe maze
const lines = input.split('\n');
const width = lines[0].length;
const height = lines.length;

const { maze, startX, startY } = (() => {
    const maze: string[][] = [];
    let startX = 0;
    let startY = 0;
    for (let y = 0; y < height; y++) {
        maze[y] = [];
        for (let x = 0; x < width; x++) {
            maze[y][x] = lines[y][x];
            if (lines[y][x] === 'S') {
                startX = x;
                startY = y;
            }
        }
    }
    return { maze, startX, startY };
})();

console.log({ width, height, startX, startY });

function getNeighbors(x: number, y: number) {
    let aboveNeighbor: { x: number; y: number; c: string } | undefined;
    let belowNeighbor: { x: number; y: number; c: string } | undefined;
    let leftNeighbor: { x: number; y: number; c: string } | undefined;
    let rightNeighbor: { x: number; y: number; c: string } | undefined;

    if (x > 0) leftNeighbor = { x: x - 1, y, c: maze[y][x - 1] };
    if (x < width - 1) rightNeighbor = { x: x + 1, y, c: maze[y][x + 1] };
    if (y > 0) aboveNeighbor = { x, y: y - 1, c: maze[y - 1][x] };
    if (y < height - 1) belowNeighbor = { x, y: y + 1, c: maze[y + 1][x] };

    return { aboveNeighbor, belowNeighbor, leftNeighbor, rightNeighbor };
}

const visited = new Set<`${number}-${number}`>();
let currentX = startX;
let currentY = startY;
let stepNumber = 0;

while (true) {
    stepNumber++;
    const currentChar = maze[currentY][currentX];
    const { aboveNeighbor, belowNeighbor, leftNeighbor, rightNeighbor } = getNeighbors(currentX, currentY);
    console.log({ currentX, currentY, currentChar, aboveNeighbor, belowNeighbor, leftNeighbor, rightNeighbor, stepNumber });

    if (['S', '|', 'L', 'J'].includes(currentChar) && aboveNeighbor && ['|', '7', 'F'].includes(aboveNeighbor.c) && !visited.has(`${aboveNeighbor.x}-${aboveNeighbor.y}`)) {
        visited.add(`${currentX}-${currentY}`);
        currentX = aboveNeighbor.x;
        currentY = aboveNeighbor.y;
        continue;
    }

    if (['S', '|', '7', 'F'].includes(currentChar) && belowNeighbor && ['|', 'L', 'J'].includes(belowNeighbor.c) && !visited.has(`${belowNeighbor.x}-${belowNeighbor.y}`)) {
        visited.add(`${currentX}-${currentY}`);
        currentX = belowNeighbor.x;
        currentY = belowNeighbor.y;
        continue;
    }

    if (['S', '-', 'J', '7'].includes(currentChar) && leftNeighbor && ['-', 'L', 'F'].includes(leftNeighbor.c) && !visited.has(`${leftNeighbor.x}-${leftNeighbor.y}`)) {
        visited.add(`${currentX}-${currentY}`);
        currentX = leftNeighbor.x;
        currentY = leftNeighbor.y;
        continue;
    }

    if (['S', '-', 'L', 'F'].includes(currentChar) && rightNeighbor && ['-', 'J', '7'].includes(rightNeighbor.c) && !visited.has(`${rightNeighbor.x}-${rightNeighbor.y}`)) {
        visited.add(`${currentX}-${currentY}`);
        currentX = rightNeighbor.x;
        currentY = rightNeighbor.y;
        continue;
    }

    break;
}

console.log({ startX, startY, currentX, currentY, stepNumber, largestStepDistance: stepNumber / 2 });
