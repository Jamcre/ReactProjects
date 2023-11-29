const express = require("express");
const cors = require("cors");
// Using dynamic import because fetch import wasn't working. I.E: CommonJS and ES Module conflict
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();
const port = 3001;

let wordApiCallCount = 0;
let quotesApiCallCount = 0;

app.use(express.json());
app.use(cors());

// Endpoint to get a random word
app.get("/getRandomWord", async (req, res) => {
  try {
    // Incrementing the word API call count
    wordApiCallCount++;
    const wordApiUrl = new URL(process.env.WORD_API_URL);

    // Fetching data from the word API
    const response = await fetch(wordApiUrl.toString());
    const data = await response.json();
    const randomWord = data[0];

    // Logging information about the word API call
    console.log("\nWORD API URL:", wordApiUrl.toString());
    console.log("WORD API CALLS:", wordApiCallCount);
    console.log("WORD API DATA:", data);

    // Sending the random word as a JSON response
    res.json({ word: randomWord });
  } catch (error) {
    // Handling errors and sending an error response
    console.error("Error fetching random word:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get a random quote
app.get("/getRandomQuote", async (req, res) => {
  try {
    // Incrementing the quotes API call count
    quotesApiCallCount++;
    const quotesApiKey = process.env.QUOTES_API_KEY;
    const quotesApiUrl = process.env.QUOTES_API_URL;

    // Fetching data from the quotes API with API key
    const response = await fetch(quotesApiUrl, {
      headers: {
        "X-Api-Key": quotesApiKey,
      },
    });

    // Handling non-OK responses from the quotes API
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    // Parsing the quote data from the API response
    const quoteData = await response.json();

    // Logging information about the quote API call
    console.log("\nQUOTE API URL:", quotesApiUrl);
    console.log("QUOTE API KEY:", quotesApiKey);
    console.log("QUOTE API CALLS:", quotesApiCallCount);
    console.log("QUOTE API DATA:", quoteData[0]);

    // Sending the random quote as a JSON response
    res.json(quoteData[0]);
  } catch (error) {
    // Handling errors and sending an error response
    console.error("Error fetching random quote:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express app and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
