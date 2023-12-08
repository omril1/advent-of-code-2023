import * as fs from 'node:fs';

// const input = `
// 32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483
// `.trim();
// const input = `
// 2345A 1
// Q2KJJ 13
// Q2Q2Q 19
// T3T3J 17
// T3Q33 11
// 2345J 3
// J345A 2
// 32T3K 5
// T55J5 29
// KK677 7
// KTJJT 34
// QQQJA 31
// JJJJJ 37
// JAAAA 43
// AAAAJ 59
// AAAAA 61
// 2AAAA 23
// 2JJJJ 53
// JJJJ2 41
// `.trim();
const input: string = fs.readFileSync('./day-7/input.txt', 'utf8');

const minorScores = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
};

type CardType = keyof typeof minorScores;

const isFiveOfAKind = (hand: string) => /(.)\1{4}/.test(hand);
const isFourOfAKind = (hand: string) => /(.)\1{3}/.test(hand.split('').sort().join(''));
const isFullHouse = (hand: string) => {
    const temp = hand.split('').sort().join('');
    return /(.)\1{2}(.)\2/.test(temp) || /(.)\1(.)\2{2}/.test(temp);
};
const isThreeOfAKind = (hand: string) => /(.)\1{2}/.test(hand.split('').sort().join(''));
const isTwoPair = (hand: string) => /(.)\1.?(.)\2/.test(hand.split('').sort().join(''));
const isOnePair = (hand: string) => /(.)\1/.test(hand.split('').sort().join(''));

function getHandMajorStrength(hand: string) {
    if (isFiveOfAKind(hand)) return 9;
    if (isFourOfAKind(hand)) return 8;
    if (isFullHouse(hand)) return 7;
    if (isThreeOfAKind(hand)) return 6;
    if (isTwoPair(hand)) return 5;
    if (isOnePair(hand)) return 4;
    return 0;
}

const cards = input.split('\n').map((line) => line.split(/\s+/)).map(([cardStr, bid]) => ({
    card: cardStr,
    bid: Number(bid),
    majorStrength: getHandMajorStrength(cardStr),
}));

const cardsSortedByStrength = cards.slice().sort((a, b) => {
    if (a.majorStrength !== b.majorStrength) {
        return a.majorStrength - b.majorStrength;
    }
    // both same length
    const aChars = a.card.split('') as CardType[];
    const bChars = b.card.split('') as CardType[];

    for (let i = 0; i < aChars.length; i++) {
        const aChar = aChars[i];
        const bChar = bChars[i];
        if (aChar === bChar) continue;
        return minorScores[aChar] - minorScores[bChar];
    }
    return 0;
});
const scores = cardsSortedByStrength.map((card, index) => {
    const rank = index + 1;
    const score = card.bid * (index + 1);
    console.log({
        ...card,
        rank,
        score,
        isFiveOfAKind: isFiveOfAKind(card.card),
        isFourOfAKind: isFourOfAKind(card.card),
        isFullHouse: isFullHouse(card.card),
        isThreeOfAKind: isThreeOfAKind(card.card),
        isTwoPair: isTwoPair(card.card),
        isOnePair: isOnePair(card.card),
    });
    return score;
});

const sum = scores.reduce((sum, score) => sum + score, 0);

console.log({ sum });
