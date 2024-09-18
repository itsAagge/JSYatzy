import { getDiceArray, getResultsArray, rollDice, saveScore } from "./dicelogic.mjs"

let diceImageSrcArray = ["https://a.l3n.co/i/8WU5ID.png", "https://a.l3n.co/i/8Wc28M.png","https://a.l3n.co/i/8WUauA.png","https://a.l3n.co/i/8WUxU0.png","https://a.l3n.co/i/8WUw73.png","https://a.l3n.co/i/8WUGmq.png"]

// Sets all input elements onclick action as saveScore, unless they're index is 6,7 or 17 which corresponds to Sum,Bonus and Total
let inputField = document.querySelectorAll(".ResultText")
for (let i in inputField) {
    if (i != 6 && i != 7 && i <= 17) {
        console.log(i)
        inputField[i].onclick = saveScore(i)
    }
}

let rollButton = document.querySelector("Button")
rollButton.onclick = () => roll()

function roll() {
    let hold = Array(5).fill(false)
    rollDice(hold)
    let diceArray = Array(0,0,0,0,0)
    getDiceArray(diceArray)
    let resultsArray = Array(18)
    getResultsArray(resultsArray)
    setDices(diceArray)
    setResults(resultsArray)
}


function setDices(dice) {
    let diceImages = document.querySelectorAll(".Dice")
    for (let i in diceImages) {
        if (i < 5) {
            diceImages[i].outerHTML = '<img src="' + diceImageSrcArray[dice[i] - 1] +  '"alt="FaceOne" class="Dice">'
        }
    }
}

function setResults(results) {

}