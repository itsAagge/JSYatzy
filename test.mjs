import { assert } from "chai";
import {rollDice} from "./dicelogic.mjs";
import { getDiceArray } from "./dicelogic.mjs";

describe ('When roll', ()=> {
    it('Should return true if all dices are between 1 and 6', () => {
        let array = Array(5).fill(false)
        rollDice(array)
        let roleCheck = true;
        let arrayDices = Array(0,0,0,0,0)
        getDiceArray(arrayDices)
        for (let i of arrayDices) {
            if (i < 1 && i > 6 && i % 1 !== 0) {
                roleCheck = false;
            }
        }
        assert.isTrue(roleCheck)
    })
})