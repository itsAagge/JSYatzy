export { rollDice, saveScore, getDiceArray, getResultsArray, getResultsBoolArray, getNumberOfThrowsLeft }
//data fields
let diceArr = Array(5).fill(0) //Holds the faces of the rolled dice
let holdArr = Array(5).fill(false) //Holds the true/false value if a dice should be hold (not be rolled again)
let resultsArr = Array(18).fill(0) /* 0 = Ones, 1 = Twos, 2 = Threes, 3 = Fours, 4 = Fives, 5 = Sixes, 6 = Sum of upper (only the locked),
                                    * 7 = Bonus of upper (only when all are locked and it is high enough), 8 = One pair, 9 = Two pairs, 10 = Three of a kind,
                                    * 11 = Four of a kind, 12 = Small straight, 13 = Large straight, 14 = Full house, 15 = Chance, 16 = Yatzy, 17 = Total sum (of all locked answers) */
let reslutsBoolArr = Array(18).fill(false) //Matches the one above (indexes 6, 7 and 17 are not used)
let nrOfThrowsLeft = 3;

let diceCountArr = Array(5).fill(0) //Holds the thrown dice divided up in faces (e.g. if you have rolled 3 ones, this array will have the number 3 on index 0)

//============================================================

//Endpoint 1 : rollDice
function rollDice(newHoldArr) {
    updateHoldArr(newHoldArr);
    if (nrOfThrowsLeft > 0) {
        rollDiceInArr();
        nrOfThrowsLeft--;
    }
    updateResults();
}

//Endpoint 2 : saveScore
function saveScore(index) {
    save(index); //TODO
    updateSumBonusTotal();
    nrOfThrowsLeft = 3;
}

//Endpoint 3 : Getters
function getDiceArray(arrayToReturn) {
    for (let i = 0; i < diceArr.length; i++) {
        arrayToReturn[i] = diceArr[i]
    }
}

function getResultsArray(arrayToReturn) {
    for (let i = 0; i < resultsArr.length; i++) {
        arrayToReturn[i] = resultsArr[i]
    }
}

function getResultsBoolArray(arrayToReturn) {
    for (let i = 0; i < reslutsBoolArr.length; i++) {
        arrayToReturn[i] = reslutsBoolArr[i]
    }
}

function getNumberOfThrowsLeft() {
    return nrOfThrowsLeft;
}

//============================================================
// Endpoint 1 : rollDice Methods
//============================================================

function updateHoldArr(newHoldArr) {
    for (let i = 0; i < holdArr.length; i++) {
        holdArr[i] = newHoldArr[i];                 //Kunne også laves som kald til det enkelte index -- TODO: Møde
    }
}

function rollDiceInArr() {
    for (let i = 0; i < diceArr.length; i++) {
        if (holdArr[i] == false) {
            diceArr[i] = Math.floor(Math.random() * 6) + 1;
        }
    }
}

function updateResults() {
    //For the upper section scores and the dice count array used to calculate the lower section scores
    for (let i = 0; i < 6; i++) {
        let j = upperSectionScore(i + 1)
        if (!reslutsBoolArr[i]) resultsArr[i] = j;
        diceCountArr[i] = j / (i + 1);
        
    }
    
    //For the lower section scores
    if (!reslutsBoolArr[8]) resultsArr[8] = onePairScore();
    if (!reslutsBoolArr[9]) resultsArr[9] = twoPairScore();
    if (!reslutsBoolArr[10]) resultsArr[10] = ofAKindScore(3);
    if (!reslutsBoolArr[11]) resultsArr[11] = ofAKindScore(4);
    if (!reslutsBoolArr[12]) resultsArr[12] = smallStraightScore();
    if (!reslutsBoolArr[13]) resultsArr[13] = largeStraightScore();
    if (!reslutsBoolArr[14]) resultsArr[14] = fullHouseScore();
    if (!reslutsBoolArr[15]) resultsArr[15] = chanceScore();
    if (!reslutsBoolArr[16]) resultsArr[16] = yatzyScore();
}

//============================================================
// Endpoint 2 : saveScore Methods
//============================================================

function save(index) {
    reslutsBoolArr[index] = true;
}

function updateSumBonusTotal() {
    let sum = 0;
    let bonus = 0;
    let total = 0;
    for (let i = 0; i < resultsArr.length; i++) {
        if (reslutsBoolArr[i]) total += resultsArr[i]; //Adds all of the saved values to the total
    }
    
    let allUpperFieldsSaved = true;
    for (let i = 0; i < 6; i++) {
        if (!reslutsBoolArr[i]) allUpperFieldsSaved = false; //Checks if all upper fields are saved
        if (reslutsBoolArr[i]) sum += resultsArr[i]; //Adds the saved upper array fields to the sum
    }
    if (allUpperFieldsSaved && sum >= 63) {
        bonus = 50;
        total += bonus; //If all upper fields are saved and the sum of 63 has been reached, a bonus of 50 will be added to the total
    }
    resultsArr[6] = sum;
    resultsArr[7] = bonus; //The sum, bonus and totals are inserted into their respective places on the results array
    resultsArr[17] = total;
}

//============================================================
// Upper Section Scores
//============================================================

function upperSectionScore(eyes) {
    let count = 0;
    for (let d of diceArr) {
        if (d == eyes) count++;
    }
    return count * eyes;
}

//============================================================
// Lower Section Scores
//============================================================

function onePairScore() {
    let onePair = 0;
    for (let i = 0; i < 6; i++) {
        if (diceCountArr[i] > 1) onePair = i + 1;
    }
    return onePair * 2;
}

function twoPairScore() {
    let firstPair = 0;
    let secondPair = 0;
    let twoFactor = 0;
    for (let i = 0; i < 6; i++) {
        if (diceCountArr[i] > 1 && firstPair == 0) firstPair = i + 1;
        else if (diceCountArr[i] > 1 && firstPair != 0) secondPair = i + 1;
    }
    if (firstPair != 0 && secondPair != 0) twoFactor = (firstPair + secondPair) * 2;
    return twoFactor;
}

function ofAKindScore(number) {
    let ofAKind = 0;
    for (let i = 0; i < 6; i++) {
        if (diceCountArr[i] > number - 1) ofAKind = i + 1;
    }
    return ofAKind * number;
}

function smallStraightScore() {
    let smallStraight = 0;
    for (let i = 0; i < 6; i++) {
        if (diceCountArr[i] == 1 && diceCountArr[5] == 0) smallStraight += i + 1;
    }
    if (smallStraight != 15) smallStraight = 0;
    return smallStraight;
}

function largeStraightScore() {
    let largeStraight = 0;
    for (let i = 0; i < 6; i++) {
        if (diceCountArr[i] == 1 && diceCountArr[0] == 0) largeStraight += i + 1;
    }
    if (largeStraight != 20) largeStraight = 0;
    return largeStraight;
}

function fullHouseScore() {
    let sum = 0;
    let pair = 0;
    let threeOfAKind = 0;
    for (let i = 0; i < 6; i++) {
        if (diceCountArr[i] == 2) pair = i + 1;
        if (diceCountArr[i] == 3) threeOfAKind = i + 1;
    }
    if (pair != 0 && threeOfAKind != 0) {
        pair *= 2;
        threeOfAKind *= 3;
        sum = pair + threeOfAKind;
    }
    return sum;
}

function chanceScore() {
    let chance = 0;
    for (let i = 0; i < 6; i++) {
        chance += diceCountArr[i] * (i + 1)
    }
    return chance;
}

function yatzyScore() {
    let yatzy = 0;
    for (let i = 0; i < 6; i++) {
        if (diceCountArr[i] == 5) yatzy = 50;
    }
    return yatzy;
}