import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import Footer from "./components/Footer";

function App() {
  // State to track the solution word and random quote
  const [solution, setSolution] = useState(null);
  const [quote, setQuote] = useState(null);

  // Fetch a random word from the server on component mount
  useEffect(() => {
    fetch("http://localhost:3001/getRandomWord") // Updated endpoint
      .then((res) => res.json())
      .then((json) => {
        // Extract the word from the API response
        const randomSolution = json.word;
        setSolution(randomSolution);
        console.log("ANSWER: " + randomSolution);
      });
  }, [setSolution]);

  // Fetch a random quote from the server on component mount
  useEffect(() => {
    // Fetch random quote
    fetch("http://localhost:3001/getRandomQuote")
      .then((res) => res.json())
      .then((quoteData) => {
        setQuote(quoteData);
        console.log("QUOTE:", quoteData);
      })
      .catch((error) => {
        console.error("Error fetching random quote:", error);
      });
  }, [setQuote]);

  // Render the main application
  return (
    <div className="App">
      <h1>Wordle Project</h1>

      {/* Render Wordle component with solution and quote */}
      {solution && <Wordle solution={solution} quote={quote} />}

      {/* Render Footer component */}
      <Footer />
    </div>
  );
}

// Export the App component
export default App;
