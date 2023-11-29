import { useState } from "react";

import(useState);

const useWordle = (solution) => {
  // State variables to track game state
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  // Function to format the current guess into an array of letter objects with colors
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    // Check for correct letters and set their color to green
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // Check for letters in the correct position but with the wrong color and set their color to yellow
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // Function to add a new guess to the game state
  const addNewGuess = (formattedGuess) => {
    // Check if the guess is correct
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    // Update the guesses, history, turn, used keys, and reset the current guess
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        // Update the color of the used keys based on the guess result
        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  // Event handler for keyup events to track the current guess
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // Check if the maximum number of turns is reached
      if (turn > 5) {
        console.log("You used all your guesses!");
        return;
      }

      // Check for duplicate words
      if (history.includes(currentGuess)) {
        console.log("You already tried that word.");
        return;
      }

      // Check if the word length is correct
      if (currentGuess.length !== 5) {
        console.log("Word must be 5 characters.");
        return;
      }

      // Format the guess and add it to the game state
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    // Handle backspace to update the current guess
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    // Handle alphabetic keys to update the current guess
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  // Return the game state and event handler for external use
  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
