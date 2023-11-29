import React from "react";

// Importing the Row component
import Row from "./Row";

// Functional component for rendering the Grid
export default function Grid({ guesses, currentGuess, turn }) {
  // Mapping through the guesses array to render each row
  return (
    <div>
      {guesses.map((g, i) => {
        // Checking if the current iteration matches the current turn
        if (turn === i) {
          // Rendering the Row component with the current guess
          return <Row key={i} currentGuess={currentGuess} />;
        }
        // Rendering the Row component with the previous guesses
        return <Row key={i} guess={g} />;
      })}
    </div>
  );
}
