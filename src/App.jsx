import { useState, useEffect } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const currentDiceArray = diceArray.map((die) => die.value);
    if (
      diceArray.every((el) => el.isHeld) &&
      [...new Set(currentDiceArray)].length === 1
    ) {
      setTenzies(true);
      console.log("game won");
    } else {
      console.log("game still playing");
    }
  }, [diceArray]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if (tenzies) {
      setDiceArray(allNewDice);
      setTenzies(false);
    } else {
      const newDiceArray = [];
      for (const dieObj of diceArray) {
        if (dieObj.isHeld) {
          newDiceArray.push(dieObj);
        } else {
          newDiceArray.push(generateNewDie());
        }
      }
      setDiceArray(newDiceArray);
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDice(id) {
    const newArray = diceArray.map((squareObj) => {
      return squareObj.id === id
        ? { ...squareObj, isHeld: !squareObj.isHeld }
        : squareObj;
    });
    setDiceArray(newArray);
  }

  const diceElements = diceArray.map((die) => (
    <Die
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies ? <Confetti /> : ""}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "Reset" : "Roll"}</button>
      <footer className="footer">
        project app -{" "}
        <a href="https://scrimba.com/learn/learnreact" target="new">
          Learn react{" "}
        </a>
        by Bob Ziroll
      </footer>
    </main>
  );
}

export default App;
