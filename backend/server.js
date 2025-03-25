import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getOpenAIResponse } from './api/openai.js';  
import { searchText, searchTextQuery } from './api/googlePlaces.js';
import { getOpenAIRating } from './api/openai.js'; 

dotenv.config();  // Load environment variables

const app = express();
const port = 3001; 

console.log("Starting the server...");  // Early log to check if the server process starts

app.use(cors());  // Enable CORS for all origins

app.use(express.json());  // Middleware to parse JSON requests

app.get("/api/chat", (req, res) => {
    res.json({ message: "Hello test from server!" });
  });

app.post("/api/chatpost", async (req, res) => {
  const { userInput } = req.body; // Get the messages from the request body
  console.log("Server received messages:", userInput);

  if (userInput) {
    try {
      // Get response from OpenAI by calling the function defined in openai.js
      console.log("Fetching result")
      const result = await getOpenAIResponse(userInput);  // Assuming userInput is the messages you send
      console.log("Result is", result)
      res.json({ message: result }); // Respond with the message - send back to frontend
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.status(400).json({ error: "Invalid input format" });
  }
});


app.post("/api/ratingpost", async (req, res) => {
  const { userInput } = req.body; // Get the messages from the request body
  console.log("Server received messages:", userInput);

  if (userInput) {
    try {
      // Get response from OpenAI by calling the function defined in openai.js
      console.log("Fetching result inside openAi rating call")
      const result = await getOpenAIRating(userInput);  // Assuming userInput is the messages you send
      console.log("Result is", result)
      res.json({ message: result }); // Respond with the message - send message to frontent 
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.status(400).json({ error: "Invalid input format" });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

app.get('/api/searchRequest', async (req, res) => {
  const request = {
    textQuery: "Tacos in Mountain View",
    fields: ["name", "geometry", "formatted_address", "rating"], // Example fields to include
    includedType: "restaurant",
    locationBias: { lat: 37.4161493, lng: -122.0812166 },
    isOpenNow: true,
    language: "en-US",
    maxResultCount: 8,
    minRating: 3.2,
    region: "us",
    useStrictTypeFiltering: false,
  };
  console.log("inside backend search request to google places ")
  try {
    console.log("Fetching result")
    const result = await searchText(request); 
    console.log("Result is", result)
    res.json({ message: result }); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }

});


app.get('/api/search', async (req, res) => {
  const query = "Schools near 320 Macarthur Avenue Hamilton"
  console.log("inside backend search request to google places ")
  try {
    console.log("Fetching result")
    const result = await searchTextQuery(query); 
    console.log("Result is", result)
    res.json(result); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }

});