import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

// Sub-Components
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

// Functional component for rendering the whole game
export default function Wordle({ solution, quote }) {
  // Destructuring values from useWordle hook
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } =
    useWordle(solution);

  // State for controlling the display of the modal
  const [showModal, setShowModal] = useState(false);

  // Event listener for keyup, triggering handleKeyup function
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    // Show modal if the word is guessed correctly
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    // Show modal if all turns are used
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    // Cleanup: Remove event listener when component unmounts
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  // Logging guesses, turn, and isCorrect on each change
  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  // Render Wordle component
  return (
    <div>
      <div>Welcome to my Wordle Project!</div>
      <div>Current Guess - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          quote={quote}
        />
      )}
    </div>
  );
}
