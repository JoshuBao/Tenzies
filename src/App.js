import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

import Confetti from 'react-confetti'

export default function App() {

 
  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)
  const [rollCount,setRollCount] = React.useState(0)
  /**
 * Challenge: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
 */
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  },[dice])
  
  function generateNewDie(){
    return(
      {value:Math.ceil(Math.random() * 6),
        isHeld:false,
        id: nanoid()}
    )
  }
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  function rollDice(){
    if (!tenzies){
      setRollCount(prevRollCount => prevRollCount + 1)
      setDice(prevDice => prevDice.map(die => {
        return(
          die.isHeld ?  
          die :
          generateNewDie()
        )})
      )
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
      setRollCount(0)
    }
  }
  function holdDice(id){
    return(
      setDice(prevDice => prevDice.map(die => {
        return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
      }))
    )
  }
  const diceElements = dice.map(die => 
  <Die key={die.id} holdDice={() => holdDice(die.id)} value={die.value} isHeld={die.isHeld} />)
  
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      
      <h3 className="rollCount">Number of Rolls: {rollCount}</h3>
      <button className="roll-dice"onClick={rollDice}>{tenzies? "New Game" : "Roll"}</button>
      
    </main>
  )
}