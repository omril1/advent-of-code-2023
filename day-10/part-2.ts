import * as fs from 'node:fs';
import chalk from 'chalk';

// const dummyInput = `
// ...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........
// `.trim();

const dummyInput = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`.trim();

const input = dummyInput;
// const input: string = fs.readFileSync('./day-10/input.txt', 'utf8');
console.log(input);

// pipe maze
const lines = input.split('\n');
const width = lines[0].length;
const height = lines.length;

const { maze, maze2, startX, startY } = (() => {
    const maze: string[][] = [];
    const maze2: string[][] = []; // Not sure if this is needed
    let startX = 0;
    let startY = 0;
    for (let y = 0; y < height; y++) {
        maze[y] = [];
        maze2[y * 2] = [];
        maze2[y * 2 + 1] = [];
        for (let x = 0; x < width; x++) {
            const char = lines[y][x];
            maze[y][x] = char;
            maze2[y * 2][x * 2] = char;
            maze2[y * 2][x * 2 + 1] = '.';
            maze2[y * 2 + 1][x * 2] = '.';
            maze2[y * 2 + 1][x * 2 + 1] = '.';
            if (char === '.') {
                maze2[y * 2][x * 2] = '.';
                maze2[y * 2][x * 2 + 1] = '.';
                maze2[y * 2 + 1][x * 2] = '.';
                continue;
            }
            if (char === 'S') {
                startX = x;
                startY = y;
                maze2[y * 2][x * 2] = char;
                maze2[y * 2 + 1][x * 2] = '|';
                maze2[y * 2][x * 2 + 1] = '-';
                continue;
            }
            if (['|', '7', 'F'].includes(char)) {
                maze2[y * 2 + 1][x * 2] = '|';
                maze2[y * 2][x * 2 + 1] = char === 'F' ? '-' : '.';
                continue;
            }
            if (['-', 'L'].includes(char)) {
                maze2[y * 2 + 1][x * 2] = '.';
                maze2[y * 2][x * 2 + 1] = '-';
                continue;
            }
            if (['|', 'L', 'J'].includes(char)) {
                maze2[y * 2 + 1][x * 2] = '.';
                maze2[y * 2][x * 2 + 1] = '.';
                continue;
            }
            if (['-', 'J', '7'].includes(char)) {
                maze2[y * 2 + 1][x * 2] = '.';
                maze2[y * 2][x * 2 + 1] = '-';
                continue;
            }
        }
    }
    return { maze, maze2, startX, startY };
})();

console.log({ width, height, startX, startY });
// print maze2
console.log(maze2.map((line) => line.join('')).join('\n'));
// fs.writeFileSync('maxze2x.txt', maze2.map((line) => line.join('')).join('\n'));
console.log();

function getNeighbors(maze: string[][], x: number, y: number) {
    const width = lines[0].length;
    const height = lines.length;
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

const visitedMazePipeLocations = new Set<`${number}-${number}`>();
let currentX = startX;
let currentY = startY;
let stepNumber = 0;

while (true) {
    stepNumber++;
    const currentChar = maze[currentY][currentX];
    const { aboveNeighbor, belowNeighbor, leftNeighbor, rightNeighbor } = getNeighbors(maze, currentX, currentY);
    // console.log({ currentX, currentY, currentChar, aboveNeighbor, belowNeighbor, leftNeighbor, rightNeighbor, stepNumber });

    if (['S', '|', 'L', 'J'].includes(currentChar) && aboveNeighbor && ['|', '7', 'F'].includes(aboveNeighbor.c) && !visitedMazePipeLocations.has(`${aboveNeighbor.x}-${aboveNeighbor.y}`)) {
        visitedMazePipeLocations.add(`${currentX}-${currentY}`);
        currentX = aboveNeighbor.x;
        currentY = aboveNeighbor.y;
        continue;
    }

    if (['S', '|', '7', 'F'].includes(currentChar) && belowNeighbor && ['|', 'L', 'J'].includes(belowNeighbor.c) && !visitedMazePipeLocations.has(`${belowNeighbor.x}-${belowNeighbor.y}`)) {
        visitedMazePipeLocations.add(`${currentX}-${currentY}`);
        currentX = belowNeighbor.x;
        currentY = belowNeighbor.y;
        continue;
    }

    if (['S', '-', 'J', '7'].includes(currentChar) && leftNeighbor && ['-', 'L', 'F'].includes(leftNeighbor.c) && !visitedMazePipeLocations.has(`${leftNeighbor.x}-${leftNeighbor.y}`)) {
        visitedMazePipeLocations.add(`${currentX}-${currentY}`);
        currentX = leftNeighbor.x;
        currentY = leftNeighbor.y;
        continue;
    }

    if (['S', '-', 'L', 'F'].includes(currentChar) && rightNeighbor && ['-', 'J', '7'].includes(rightNeighbor.c) && !visitedMazePipeLocations.has(`${rightNeighbor.x}-${rightNeighbor.y}`)) {
        visitedMazePipeLocations.add(`${currentX}-${currentY}`);
        currentX = rightNeighbor.x;
        currentY = rightNeighbor.y;
        continue;
    }

    break;
}
visitedMazePipeLocations.add(`${currentX}-${currentY}`);

console.log({ startX, startY, currentX, currentY, stepNumber, largestStepDistance: stepNumber / 2 });
console.log();

const visitedMazeGridLocations = new Set<`${number}-${number}`>();
const nextToVisit: { x: number; y: number }[] = [
    // { x: 0, y: 0 },
    // { x: width - 1, y: height - 1 },
];

for (let x = 0; x < width; x++) {
    if (!visitedMazePipeLocations.has(`${x}-${0}`)) {
        nextToVisit.push({ x, y: 0 });
    }
    if (!visitedMazePipeLocations.has(`${x}-${height - 1}`)) {
        nextToVisit.push({ x, y: height - 1 });
    }
}
for (let y = 0; y < height; y++) {
    if (!visitedMazePipeLocations.has(`${0}-${y}`)) {
        nextToVisit.push({ x: 0, y: 0 });
    }
    if (!visitedMazePipeLocations.has(`${width - 1}-${y}`)) {
        nextToVisit.push({ x: width - 1, y });
    }
}

while (nextToVisit.length > 0) {
    const { x, y } = nextToVisit.pop()!;
    const { aboveNeighbor, belowNeighbor, leftNeighbor, rightNeighbor } = getNeighbors(maze2, x, y);

    if (aboveNeighbor && !visitedMazeGridLocations.has(`${aboveNeighbor.x}-${aboveNeighbor.y}`) && !visitedMazePipeLocations.has(`${aboveNeighbor.x}-${aboveNeighbor.y}`)) {
        nextToVisit.push(aboveNeighbor);
    }

    if (belowNeighbor && !visitedMazeGridLocations.has(`${belowNeighbor.x}-${belowNeighbor.y}`) && !visitedMazePipeLocations.has(`${belowNeighbor.x}-${belowNeighbor.y}`)) {
        nextToVisit.push(belowNeighbor);
    }

    if (leftNeighbor && !visitedMazeGridLocations.has(`${leftNeighbor.x}-${leftNeighbor.y}`) && !visitedMazePipeLocations.has(`${leftNeighbor.x}-${leftNeighbor.y}`)) {
        nextToVisit.push(leftNeighbor);
    }

    if (rightNeighbor && !visitedMazeGridLocations.has(`${rightNeighbor.x}-${rightNeighbor.y}`) && !visitedMazePipeLocations.has(`${rightNeighbor.x}-${rightNeighbor.y}`)) {
        nextToVisit.push(rightNeighbor);
    }
    visitedMazeGridLocations.add(`${x}-${y}`);
}

for (let y = 0; y < height * 2; y++) {
    for (let x = 0; x < width * 2; x++) {
        if (visitedMazePipeLocations.has(`${x}-${y}`)) {
            maze[y][x] = chalk.bgRed(maze[y][x]);
        }
        if (visitedMazeGridLocations.has(`${x}-${y}`)) {
            maze[y][x] = chalk.bgGreen(maze[y][x]);
        }
    }
}

// print maze
console.log(maze.map((line) => line.join('')).join('\n'));
console.log();

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const cacheKey = `${x}-${y}` as const;
        if (visitedMazePipeLocations.has(cacheKey)) {
            maze2[y * 2][x * 2] = chalk.bgRed(maze2[y * 2][x * 2]);
            maze2[y * 2][x * 2 + 1] = chalk.bgRed(maze2[y * 2][x * 2 + 1]);
            maze2[y * 2 + 1][x * 2] = chalk.bgRed(maze2[y * 2 + 1][x * 2]);
            maze2[y * 2 + 1][x * 2 + 1] = chalk.bgRed(maze2[y * 2 + 1][x * 2 + 1]);
        }
        if (visitedMazeGridLocations.has(cacheKey)) {
            maze2[y * 2][x * 2] = chalk.bgGreen(maze2[y * 2][x * 2]);
            maze2[y * 2][x * 2 + 1] = chalk.bgGreen(maze2[y * 2][x * 2 + 1]);
            maze2[y * 2 + 1][x * 2] = chalk.bgGreen(maze2[y * 2 + 1][x * 2]);
            maze2[y * 2 + 1][x * 2 + 1] = chalk.bgGreen(maze2[y * 2 + 1][x * 2 + 1]);
        }
    }
}

// print maze2
console.log(maze2.map((line) => line.join('')).join('\n'));
console.log();

console.log({
    visitedMazePipeLocations: visitedMazePipeLocations.size,
    visitedMazeGridLocations: visitedMazeGridLocations.size,
    mazeArea: width * height,
    // 637 is too high
    answer: (width * height) - visitedMazePipeLocations.size - visitedMazeGridLocations.size,
});
