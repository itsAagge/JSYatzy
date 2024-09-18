import { getDiceArray, getResultsArray, rollDice, saveScore } from "./dicelogic.mjs"

let diceImageSrcArray = []

// Sets all input elements onclick action as saveScore, unless they're index is 6,7 or 17 which corresponds to Sum,Bonus and Total
let inputField = document.querySelectorAll(".ResultText")
for (let i in inputField) {
    if (i != 6 && i != 7 && i <= 17) {
        console.log(i)
        inputField[i].onclick = saveScore(i)
    }
}

let rollButton = document.querySelector("Button")
rollButton.onclick = roll()

function roll() {
    console.log("TESTER")
    let hold = Array(5).fill(false)
    rollDice(hold)
    let diceArray = getDiceArray()
    let resultsArray = getResultsArray()
    setDices(diceArray)
    setResults(resultsArray)
}

function setDices(dice) {
    let diceImages = document.querySelectorAll(".Dice")
    for (let die of diceImages) {
        die.outerHTML = '<img src="' + '"https://a.l3n.co/i/8WU5ID.png"' +  'alt="FaceOne" class="Dice"></td>'
    }
}

function setResults(results) {

}