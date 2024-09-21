import { getDiceArray, getNumberOfThrowsLeft, getResultsArray, getResultsBoolArray, rollDice, saveScore } from "./dicelogic.mjs"

let diceImageSrcArray = ["https://a.l3n.co/i/8WU5ID.png", "https://a.l3n.co/i/8Wc28M.png","https://a.l3n.co/i/8WUauA.png","https://a.l3n.co/i/8WUxU0.png","https://a.l3n.co/i/8WUw73.png","https://a.l3n.co/i/8WUGmq.png"]
let heldArr = Array(5).fill(false)

let inputField = document.querySelectorAll(".ResultText");
let diceAreas = document.querySelectorAll(".Dice")
let rollButton = document.querySelector("Button")
rollButton.onclick = () => roll()

// Sets all input elements onclick action as saveScore, unless they're index is 6,7 or 17 which corresponds to Sum,Bonus and Total
function activateResultSaveFields(activate, reslutsBoolArr) {
    for (let i in inputField) {
        if (i != 6 && i != 7 && i <= 17 && activate && !reslutsBoolArr[i]) {
            inputField[i].onclick = () => saveRoll(i)
        } else if (i <= 17) {
            inputField[i].onclick = null
        }
    }
}

// Gives the ability to hold the die (so they wont be thrown in the next roll)
function addHoldFunction(activate) {
    diceAreas = document.querySelectorAll(".Dice"); 
    for (let i in diceAreas) {
        if (i < 5 && activate) {
            diceAreas[i].onclick = () => holdDie(i)
        } else if (i < 5) {
            diceAreas[i].onclick = null
        }
    }
}

// Gives the ability to save your roll and start on the next round
function saveRoll(i) {
    saveScore(i)
    heldArr.fill(false);
    let reslutsBoolArr = Array(18)
    getResultsBoolArray(reslutsBoolArr)
    activateResultSaveFields(false, reslutsBoolArr)
    document.querySelector("#Turn").innerHTML = "Rolls left: " + getNumberOfThrowsLeft()
    for (let i = 0; i < diceAreas.length; i++) {
        diceAreas[i].setAttribute("style", "opacity:1.0;")
    }
    inputField[i].setAttribute("style", "background-color:grey;")
    addHoldFunction(false)
    let resultsArray = Array(18)
    getResultsArray(resultsArray)
    setResults(resultsArray)
}

// Gives the ability to hold the individual die and display that it is held
function holdDie(i) {
    heldArr[i] = !heldArr[i]
    if (heldArr[i]) {
        diceAreas[i].setAttribute("style", "opacity:0.5;")
    } else {
        diceAreas[i].setAttribute("style", "opacity:1.0;")
    }
}

// The function that rolls the dice
function roll() {
    rollDice(heldArr)
    document.querySelector("#Turn").innerHTML = "Rolls left: " + getNumberOfThrowsLeft()
    let diceArray = Array(0,0,0,0,0)
    getDiceArray(diceArray)
    let resultsArray = Array(18)
    getResultsArray(resultsArray)
    setDices(diceArray)
    setResults(resultsArray)
    addHoldFunction(true)
    let reslutsBoolArr = Array(18)
    getResultsBoolArray(reslutsBoolArr)
    activateResultSaveFields(true, reslutsBoolArr)
}

// The function that updates the dice images to show the same as the thrown dice
function setDices(dice) {
    let diceImages = document.querySelectorAll(".Dice")
    for (let i in diceImages) {
        if (i < 5 && !heldArr[i]) {
            diceImages[i].outerHTML = '<img src="' + diceImageSrcArray[dice[i] - 1] +  '"alt="FaceOne" class="Dice">'
        }
    }
}

// Updates the input fields with results
function setResults(results) {
    for (let i in inputField) {
        if (i < 18) inputField[i].value = results[i]
    }
}