import React, { useEffect, useState } from "react";

// Functional component for rendering the Keypad
export default function Keypad({ usedKeys }) {
  // Define the available letters
  const [letters, setLetters] = useState([
    { key: "q" },
    { key: "w" },
    { key: "e" },
    { key: "r" },
    { key: "t" },
    { key: "y" },
    { key: "u" },
    { key: "i" },
    { key: "o" },
    { key: "p" },
    { key: "a" },
    { key: "s" },
    { key: "d" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: "z" },
    { key: "x" },
    { key: "c" },
    { key: "v" },
    { key: "b" },
    { key: "n" },
    { key: "m" },
  ]);

  // Render the keypad with letter buttons
  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          // Get the color for the current letter
          const color = usedKeys[l.key];
          // Render the letter button with the corresponding color
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
