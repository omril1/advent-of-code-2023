import * as fs from 'node:fs';

// const input = `
// seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4
// `.trim();
const input: string = fs.readFileSync('./day-5/input.txt', 'utf8');

const [
    seedsRaw,
    seedToSoilMapRaw,
    soilToFertilizerMapRaw,
    fertilizerToWaterMapRaw,
    waterToLightMapRaw,
    lightToTemperatureMapRaw,
    temperatureToHumidityMapRaw,
    humidityToLocationMapRaw,
] = input.split('\n\n');

function generateMapFromSource(raw: string, debugName: string) {
    const numbers = raw.split(':\n')[1].split('\n').map(line => line.split(' ').map(n => Number(n)));
    const ranges = numbers.map(([dest, source, length]) => ({ dest, source, length })).sort((a, b) => {
        if (a.source === b.source) {
            return a.length - b.length;
        }
        return a.source - b.source;
    });
    let lowest = Infinity;
    return (num: number) => {
        for (const range of ranges) {
            if (num >= range.source && num < range.source + range.length) {
                const result = num + range.dest - range.source;
                // console.log('mapped', num, '\tto', result, '\tusing        ', debugName, '\tmap', 'range', range);
                lowest = Math.min(lowest, result);
                return result;
            }
        }
        // console.log('mapped', num, '\tto', num, '\tusing default', debugName, '\tmap');
        return num;
    }
}

const seeds = seedsRaw.split(': ')[1].split(' ').map(Number);
const seedPairsAsRanges = seeds.flatMap((seed, i) => i % 2 ? [] : [[seed, seeds[i + 1]]]).sort((a, b) => a[0] - b[0]);

const seedToSoil = generateMapFromSource(seedToSoilMapRaw, 'seedToSoil');
const soilToFertilizer = generateMapFromSource(soilToFertilizerMapRaw, 'soilToFertilizer');
const fertilizerToWater = generateMapFromSource(fertilizerToWaterMapRaw, 'fertilizerToWater');
const waterToLight = generateMapFromSource(waterToLightMapRaw, 'waterToLight');
const lightToTemperature = generateMapFromSource(lightToTemperatureMapRaw, 'lightToTemperature');
const temperatureToHumidity = generateMapFromSource(temperatureToHumidityMapRaw, 'temperatureToHumidity');
const humidityToLocation = generateMapFromSource(humidityToLocationMapRaw, 'humidityToLocation');

const seedToLocation = (num: number) => {
    const a = seedToSoil(num);
    const b = soilToFertilizer(a);
    const c = fertilizerToWater(b);
    const d = waterToLight(c);
    const e = lightToTemperature(d);
    const f = temperatureToHumidity(e);
    return humidityToLocation(f);
};

let lowestLocation = Infinity;

const startTime = Date.now();

for (const [start, length] of seedPairsAsRanges) {
    console.log({ length, seedPairsAsRanges: seedPairsAsRanges.length });
    for (let i = start; i < start + length; i++) {
        const location = seedToLocation(i);
        if (i % 10_000 === 0) {
            console.log({ i, location, lowestLocation });
        }
        lowestLocation = Math.min(location, lowestLocation);
    }
}

console.log({ seeds, lowestLocation, time: Date.now() - startTime });