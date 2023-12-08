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
    J: 1,
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

function getCharsCount(str: string) {
    const groups: Partial<Record<CardType, number>> = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        groups[char as CardType] = (groups[char as CardType] ?? 0) + 1;
    }
    return groups;
}

function isFiveOfAKind(counts: Partial<Record<CardType, number>>) {
    if (counts.J === 5) return true;
    return Object.values(counts).some((count) => count === 5 - (counts.J ?? 0));
}

function isFourOfAKind({ J, ...counts }: Partial<Record<CardType, number>>) {
    if (J && J >= 3) return true;
    return Object.values(counts).some((count) => count >= 4 - (J ?? 0));
}

function isFullHouse({J, ...counts }: Partial<Record<CardType, number>>) {
    return Object.values(counts).filter((count) => count >= 1 - (J ?? 0)).length === 2
}

function isThreeOfAKind(counts: Partial<Record<CardType, number>>) {
    if (counts.J) {
        if (counts.J >= 3) return true;

        for (const count of Object.values(counts)) {
            if (counts.J === 2 && count === 1) {
                return true;
            }
            if (counts.J === 1 && count === 2) {
                return true;
            }
        }
    }
    return Object.values(counts).some((count) => count >= 3);
}

function isTwoPair(counts: Partial<Record<CardType, number>>) {
    if (counts.J && counts.J >= 2) return true;
    let usedJ = false;
    let pairs = 0;
    for (const count of Object.values(counts)) {
        if (count === 1 && counts.J && !usedJ) {
            usedJ = true;
            pairs++;
        }
        if (count === 2) pairs++;
        if (pairs >= 2) return true;
    }
    return Object.values(counts).filter((count) => count >= 2).length === 2;
}

function isOnePair(counts: Partial<Record<CardType, number>>) {
    if (counts.J && counts.J >= 1) return true;
    return Object.values(counts).some((count) => count >= 2);
}

function getHandMajorStrength(hand: string) {
    const counts = getCharsCount(hand);
    if (isFiveOfAKind(counts)) return 9;
    if (isFourOfAKind(counts)) return 8;
    if (isFullHouse(counts)) return 7;
    if (isThreeOfAKind(counts)) return 6;
    if (isTwoPair(counts)) return 5;
    if (isOnePair(counts)) return 4;
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
        // return minorScores[bChar] - minorScores[aChar];
        return minorScores[aChar] - minorScores[bChar];
    }
    return 0;
});
const scores = cardsSortedByStrength.map((hand, index) => {
    const score = hand.bid * (index + 1);
    // const rank = index + 1;
    // const counts = getCharsCount(hand.card);
    // console.log({
    //     ...hand,
    //     rank,
    //     score,
    //     counts,
    //     isFiveOfAKind: isFiveOfAKind(counts),
    //     isFourOfAKind: isFourOfAKind(counts),
    //     isFullHouse: isFullHouse(counts),
    //     isThreeOfAKind: isThreeOfAKind(counts),
    //     isTwoPair: isTwoPair(counts),
    //     isOnePair: isOnePair(counts),
    // });
    return score;
});

console.log(cardsSortedByStrength.map(h => h.card).join(',') === `2345A,J345A,2345J,32T3K,KK677,T3Q33,Q2KJJ,T3T3J,Q2Q2Q,2AAAA,T55J5,QQQJA,KTJJT,JJJJJ,JJJJ2,JAAAA,2JJJJ,AAAAJ,AAAAA`);

// 251_806_100 is too high, 253_192_317 is too high, 251_100_413 is too low, 251_114_111 is not correct
const sum = scores.reduce((sum, score) => sum + score, 0);
console.log({ sum });
