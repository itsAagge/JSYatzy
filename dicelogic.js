//data fields
let diceArr = []
let holdArr = []
let resultsArr = []
let reslutBoolArr = []

//============================================================

function updateHoldArr(newHold) {
    for (let i = 0; i < holdArr.length; i++) {
        holdArr[i] = newHold[i]
    }
}

//============================================================

function rollDice() {
    for (let i = 0; i < diceArr.length; i++) {
        if (holdArr[i] == false) {
            diceArr[i] = Math.floor(Math.random * 6) + 1
        }
    }
}

function updateResults() {
    
}