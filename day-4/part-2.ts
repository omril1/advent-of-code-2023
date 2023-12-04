import * as fs from 'node:fs';

// const input = `
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
// `.trim();
const input: string = fs.readFileSync('./day-4/input.txt', 'utf8');

const lines = input.split('\n');

let total = 0;
// maps between card number and it's copies
const cardCopiesMap = new Map<number, number>();

for (const line of lines) {
    const [card, numbers] = line.split(': ');
    const cardNumber = Number(card.slice(5));
    const [winning, hand] = numbers.split('|').map(cardNumber => cardNumber.trim().split(/ +/).map(Number));
    const numOfWinningCardsInHand = hand.filter((cardNumber) => winning.includes(cardNumber)).length;

    const cardCopies = (cardCopiesMap.get(cardNumber) || 0) + 1;
    cardCopiesMap.set(cardNumber, cardCopies);
    
    for (let i = 1; i < numOfWinningCardsInHand + 1; i++) {
        const futureCardCopies = (cardCopiesMap.get(cardNumber + i) || 0) + cardCopies;
        cardCopiesMap.set(cardNumber + i, futureCardCopies);
    }
    if (cardCopiesMap.has(cardNumber)) {
        total += cardCopiesMap.get(cardNumber)!;
    }
    console.dir({ cardNumber, cardCopies, numOfWinningCardsInHand, map: [...cardCopiesMap], score: total }, { depth: null, maxArrayLength: 10 });
}

console.dir({ score: total });
