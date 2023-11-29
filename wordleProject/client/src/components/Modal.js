import React from "react";

// Functional component for rendering the Modal for Win/Lose Game
export default function Modal({ isCorrect, turn, solution, quote }) {
  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="modal">
      {/* Display win message if the guess is correct */}
      {isCorrect && (
        <div>
          <h1>Congratulations, You Win!</h1>
          <p className="solutionLose">{solution}</p>
          <p>Solution found in {turn} guesses</p>
          <button onClick={refreshPage}>AGAIN?</button>
        </div>
      )}

      {/* Display lose message and a funny quote if the guess is incorrect */}
      {!isCorrect && (
        <div>
          <h1>Tough Luck, You Lose!</h1>
          <h3>The answer was:</h3>
          <p className="solutionWin">{solution}</p>
          <p>Better luck next time...</p>
          <button onClick={refreshPage}>AGAIN?</button>
          <br></br>
          <h3>Here's a funny quote to make you feel better!</h3>
          <p>
            "{quote["quote"]}"<br></br>-{quote["author"]}
          </p>
        </div>
      )}
    </div>
  );
}
