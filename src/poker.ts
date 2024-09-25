
enum Value {
    TWO = 2,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE
}
enum Suit {
    H,
    D,
    C,
    S
}
enum Handset {
    NOTHING,
    HIGHCARD,
    PAIR,
    TWO_PAIR,
    THREE_OF_A_KIND,
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR_OF_A_KIND,
    STRAIGHT_FLUSH,
    ROYAL_FLUSH
}
class Card {
    value: number;
    suit: string;

    constructor() {
        this.value = 0;
        this.suit = '';
    }
}

class Deck {
    public cards: Card[];
    constructor() {
        this.cards = new Array(52);
        this.CreatDeck();
        this.SuffleDeck();
    }
    CreatDeck() {
        let index = 0;

        for (let suit in Suit) {
            if (!isNaN(Number(suit))) {
                for (let value in Value) {
                    if (isNaN(Number(value))) {
                        this.cards[index] = {
                            value: Number(Value[value]),
                            suit: Suit[suit]
                        }
                        index++;
                    }
                }
            }
        }
    }
    SuffleDeck() {
        for (let i = 0; i < this.cards.length; i++) {
            let j = Math.floor(Math.random() * this.cards.length);
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

class Player {
    cards: Card[];
    handset: Handset;
    hasPair: boolean;
    hasTwoPair: boolean;
    hasThreeOfAKind: boolean;
    hasStraight: boolean;
    hasFlush: boolean;
    hasFullHouse: boolean;
    hasFourOfAKind: boolean;
    hasStraightFlush: boolean;
    hasRoyalFlush: boolean;
    constructor() {
        this.cards = [];
        this.handset = Handset.NOTHING;
        this.hasPair = false;
        this.hasTwoPair = false;
        this.hasThreeOfAKind = false;
        this.hasStraight = false;
        this.hasFlush = false;
        this.hasFullHouse = false;
        this.hasFourOfAKind = false;
        this.hasStraightFlush = false;
        this.hasRoyalFlush = false;
    }
}
class Table {
    cards: Card[];

    constructor() {
        this.cards = [];
    }
    Deal_CmD(card: Card, value: number) {
        if (value == 0) {
            this.cards.push(card);
        }
        else {
            p.cards.push(card);
        }
        AddCard(card, value);
        HandValueation.CheckForPair(p, this.cards);
        HandValueation.CheckForTwoPair(p, this.cards);
        HandValueation.CheckForThreeOfAKind(p, this.cards);
        HandValueation.CheckForStraight(p, this.cards);
        HandValueation.CheckForFlush(p, this.cards);
        HandValueation.CheckForFullHouse(p, this.cards);
        HandValueation.CheckForFourOfAKind(p, this.cards);
    }
    DealPlayerInitialCards(p: Player, deck: Deck) {
        for (let i = 0; i < 2; i++) {
            let ran_card = Math.floor(Math.random() * deck.cards.length);
            p.cards.push(deck.cards[ran_card]);
            AddCard(p.cards[i], 1);
            deck.cards.splice(ran_card, 1);
        }
    }
    DealFlopCards(p: Player, deck: Deck) {
        for (let i = 0; i < 3; i++) {
            let ran_card = Math.floor(Math.random() * deck.cards.length);
            this.cards.push(deck.cards[ran_card]);
            AddCard(this.cards[i], 0);
            deck.cards.splice(ran_card, 1);
        }
        HandValueation.CheckForPair(p, this.cards);
        HandValueation.CheckForTwoPair(p, this.cards);
        HandValueation.CheckForThreeOfAKind(p, this.cards);
        HandValueation.CheckForStraight(p, this.cards);
        HandValueation.CheckForFlush(p, this.cards);
        HandValueation.CheckForFullHouse(p, this.cards);
        HandValueation.CheckForFourOfAKind(p, this.cards);
    }
    DealTurnAndRiverCard(p: Player, deck: Deck) {
        let ran_card = Math.floor(Math.random() * deck.cards.length);
        this.cards.push(deck.cards[ran_card]);
        AddCard(deck.cards[ran_card], 0);
        deck.cards.splice(ran_card, 1);
        HandValueation.CheckForPair(p, this.cards);
        HandValueation.CheckForTwoPair(p, this.cards);
        HandValueation.CheckForThreeOfAKind(p, this.cards);
        HandValueation.CheckForStraight(p, this.cards);
        HandValueation.CheckForFlush(p, this.cards);
        HandValueation.CheckForFullHouse(p, this.cards);
        HandValueation.CheckForFourOfAKind(p, this.cards);
    }

}
class HandValueation {

    static CheckForPair(p: Player, cards: Card[]) {
        let cards_vl = cards.map(card => card.value);
        if (p.cards[0].value == p.cards[1].value || cards_vl.includes(p.cards[0].value) || cards_vl.includes(p.cards[1].value)) {
            p.handset = Handset.PAIR;
            SendMessage('Pair');
        }
    }
    static CheckForTwoPair(p: Player, cards: Card[]) {
        let allCards = [...p.cards, ...cards]
        let sorted_cards = allCards.map(card => card.value).sort((a, b) => a - b);
        let count = 1;
        let has_first_pair: boolean = false;
        let has_second_pair: boolean = false;
        let temp: number[] = [];
        for (let i = 0; i < sorted_cards.length - 1; i++) {
            if (sorted_cards[i] == sorted_cards[i + 1]) {
                count++;
                temp.push(sorted_cards[i]);
            }
            else {
                if (count == 2 && !has_first_pair) {
                    has_first_pair = true;
                    temp.push(sorted_cards[i]);
                }
                else if (count == 2 && has_first_pair && !has_second_pair) {
                    has_second_pair = true;
                    temp.push(sorted_cards[i]);
                }
                count = 1;
            }

        }
        if (!(has_first_pair && has_second_pair)) return;
        if (!(temp.includes(p.cards[0].value) || temp.includes(p.cards[1].value))) return;
        p.handset = Handset.TWO_PAIR;
        SendMessage('Two Pairs')
    }
    static CheckForThreeOfAKind(p: Player, cards: Card[]) {
        let sorted_cards = cards.map(card => card.value).sort((a, b) => a - b);
        let count = 1;
        if (p.cards[0].value == p.cards[1].value) {
            sorted_cards.forEach(card => {
                if (card == p.cards[0].value) {
                    p.handset = Handset.THREE_OF_A_KIND;
                    SendMessage('Three of A Kind');
                    return;
                }
            })
        }
        else if (sorted_cards.includes(p.cards[0].value)) {
            sorted_cards.forEach(card => {
                if (card == p.cards[0].value) {
                    count++;
                }
            })
        }
        else {
            sorted_cards.forEach(card => {
                if (card == p.cards[1].value) {
                    count++;
                }
            })
        }
        if (count !== 3) return;
        p.handset = Handset.THREE_OF_A_KIND;
        SendMessage('Three of A Kind');
    }
    static CheckForStraight(p: Player, cards: Card[]) {
        let allCards = [...p.cards, ...cards]
        let unique_value = new Set(allCards.map(card => card.value));
        let sorted_cards = Array.from(unique_value).sort((a, b) => a - b);
        let consecutive_count: number = 1;
        let temp: number[] = [];
        for (let i = 0; i < sorted_cards.length - 1; i++) {
            if (sorted_cards[i] === sorted_cards[i + 1] - 1) {
                consecutive_count++;
                temp.push(sorted_cards[i]);
                if (consecutive_count == 5) {
                    temp.push(sorted_cards[i + 1]);
                    break;
                }
            }
            else {
                consecutive_count = 1;
                temp = [];
            }
        }
        if (consecutive_count !== 5) return;
        if (!(temp.includes(p.cards[0].value) || temp.includes(p.cards[1].value))) return;
        p.handset = Handset.STRAIGHT;
        SendMessage('Straight');
    }
    static CheckForFlush(p: Player, cards: Card[]) {
        let allCards = [...p.cards, ...cards]
        let sorted_cards = allCards.map(card => card.suit).sort((a, b) => a.localeCompare(b));
        let consecutive_count: number = 1;
        let temp: string[] = [];
        for (let i = 0; i < sorted_cards.length - 1; i++) {
            if (sorted_cards[i].toLowerCase() == sorted_cards[i + 1].toLowerCase()) {
                consecutive_count++;
                temp.push(sorted_cards[i]);
                if (consecutive_count == 5) {
                    temp.push(sorted_cards[i + 1]);
                    break;
                }
            }
            else {
                consecutive_count = 1;
                temp = [];
            }
        }
        if (consecutive_count !== 5) return;
        if (!(temp.includes(p.cards[0].suit) || temp.includes(p.cards[1].suit))) return;
        p.handset = Handset.FLUSH;
        SendMessage('Flush');
    }
    static CheckForFullHouse(p: Player, card: Card[]) {
        let allCards = [...p.cards, ...card]
        let sorted_cards = allCards.map(card => card.value).sort((a, b) => a - b);
        let count = 1;
        let has_pair: boolean = false;
        let has_three_of_a_kind: boolean = false;
        let temp: number[] = [];
        for (let i = 0; i < sorted_cards.length - 1; i++) {
            if (sorted_cards[i] == sorted_cards[i + 1]) {
                count++;
                temp.push(sorted_cards[i]);
            }
            else {
                if (count == 2) {
                    has_pair = true;
                } else if (count == 3) {
                    has_three_of_a_kind = true;
                }
                count = 1;
            }
        }
        if (!(has_pair && has_three_of_a_kind)) return;
        if (!(temp.includes(p.cards[0].value) || temp.includes(p.cards[1].value))) return;
        p.handset = Handset.FULL_HOUSE;
        SendMessage('Full House');
    }
    static CheckForFourOfAKind(p: Player, card: Card[]) {
        let allCards = [...p.cards, ...card]
        let sorted_cards = allCards.map(card => card.value).sort((a, b) => a - b);
        let count = 1;
        let temp: number[] = [];
        let has_four_of_a_kind: boolean = false;
        for (let i = 0; i < sorted_cards.length - 1; i++) {
            if (sorted_cards[i] == sorted_cards[i + 1]) {
                count++;
                temp.push(sorted_cards[i]);
                if (count == 4) {
                    has_four_of_a_kind = true;
                    temp.push(sorted_cards[i + 1]);
                    break;
                }
            }
            else {
                count = 1;
                temp = [];
            }
        }
        if (!has_four_of_a_kind) return;
        if (!(temp.includes(p.cards[0].value) || temp.includes(p.cards[1].value))) return;
        p.handset = Handset.FOUR_OF_A_KIND;
        SendMessage('Four of a Kind');
    }
}
function SendMessage(message: string) {
    console.log(`Player has: ${message}.`);
}
function AddCard(card: Card, type: number) {
    let img = document.createElement('img');

    if (card.value == 11) {
        img.src = '../assets/cards/J' + '-' + card.suit + '.png';
    } else if (card.value == 12) {
        img.src = '../assets/cards/Q' + '-' + card.suit + '.png';
    } else if (card.value == 13) {
        img.src = '../assets/cards/K' + '-' + card.suit + '.png';
    } else if (card.value == 14) {
        img.src = '../assets/cards/A' + '-' + card.suit + '.png';
    } else {
        img.src = '../assets/cards/' + card.value.toString() + '-' + card.suit + '.png';
    }
    if (type == 0) {
        let table_cards = document.getElementById('table-cards');
        table_cards?.appendChild(img)
    }
    else {
        let player_hand = document.getElementById('player-hand');
        player_hand?.appendChild(img)
    }
}
let deck: Deck = new Deck();
let p: Player = new Player();
let table: Table = new Table();
function DealTurnAndRiver() {
    table.DealTurnAndRiverCard(p, deck);
}
function Cmd_Deal(value: number, suit: string, type: number) {
    let card = new Card();
    card.value = value;
    card.suit = suit;
    table.Deal_CmD(card, type);
}
function StartGame() {
    // table.DealPlayerInitialCards(p,deck);
    // table.DealFlopCards(p,deck);
}