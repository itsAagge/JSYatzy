import { getDiceArray, getNumberOfThrowsLeft, getResultsArray, rollDice, saveScore } from "./dicelogic.mjs"

let diceImageSrcArray = ["https://a.l3n.co/i/8WU5ID.png", "https://a.l3n.co/i/8Wc28M.png","https://a.l3n.co/i/8WUauA.png","https://a.l3n.co/i/8WUxU0.png","https://a.l3n.co/i/8WUw73.png","https://a.l3n.co/i/8WUGmq.png"]
let heldArr = Array(5).fill(false)

// Sets all input elements onclick action as saveScore, unless they're index is 6,7 or 17 which corresponds to Sum,Bonus and Total
let inputField = document.querySelectorAll(".ResultText")
for (let i in inputField) {
    if (i != 6 && i != 7 && i <= 17) {
        inputField[i].onclick = () => saveRoll(i)
    }
}

let diceAreas = document.querySelectorAll(".Dice")
let rollButton = document.querySelector("Button")
rollButton.onclick = () => roll()
addHoldFunction()

function addHoldFunction() {
    diceAreas = document.querySelectorAll(".Dice"); 
    for (let i in diceAreas) {
        if (i < 5) {
            diceAreas[i].onclick = () => holdDie(i)
        }
    }
}

function saveRoll(i) {
    saveScore(i)
    heldArr.fill(false);
    roll()
    inputField[i].onclick = null
    inputField[i].setAttribute("style", "background-color:grey;")
}

function holdDie(i) {
    heldArr[i] = !heldArr[i]
    if (heldArr[i]) {
        diceAreas[i].setAttribute("style", "opacity:0.5;")
    } else {
        diceAreas[i].setAttribute("style", "opacity:1.0;")
    }
}


function roll() {
    rollDice(heldArr)
    let rollCounter = document.querySelector("#Turn").innerHTML = "Rolls left: " + getNumberOfThrowsLeft()
    let diceArray = Array(0,0,0,0,0)
    getDiceArray(diceArray)
    let resultsArray = Array(18)
    getResultsArray(resultsArray)
    setDices(diceArray)
    setResults(resultsArray)
    addHoldFunction()
}


function setDices(dice) {
    let diceImages = document.querySelectorAll(".Dice")
    for (let i in diceImages) {
        if (i < 5 && !heldArr[i]) {
            diceImages[i].outerHTML = '<img src="' + diceImageSrcArray[dice[i] - 1] +  '"alt="FaceOne" class="Dice">'
        }
    }
}

function setResults(results) {
    for (let i in inputField) {
        if (i < 18) inputField[i].value = results[i]
    }
}