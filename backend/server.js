import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getOpenAIResponse } from './api/openai.js';  // Import the function from openai.js

dotenv.config();  // Load environment variables

const app = express();
const port = 3001;  // was originally 5000

console.log("Starting the server...");  // Early log to check if the server process starts

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());  

app.get("/api/chat", (req, res) => {
    res.json({ message: "Hello test from server!" });
  });

// Endpoint to handle chat and process user input THIS WORKS 
/*
app.post("/api/chatpost", (req, res) => {
    const { userInput } = req.body; // Get the messages from the request body
    console.log("Server received messages:", userInput);
  
    // Ensure that the userInput is provided
    if (userInput) {
        // You can process the user input here, or just send a basic response
        res.json({ message: `Received your message: "${userInput}"` }); // Respond with the message

    } else {
        res.status(400).json({ error: "Invalid input format" });
    }
  });
*/

app.post("/api/chatpost", async (req, res) => {
  const { userInput } = req.body; // Get the messages from the request body
  console.log("Server received messages:", userInput);

  // Ensure that the userInput is provided
  if (userInput) {
    try {
      // Get response from OpenAI by calling the function defined in openai.js
      console.log("Fetching result")
      const result = await getOpenAIResponse(userInput);  // Assuming userInput is the messages you send
      console.log("Result is", result)
      // Send the result back to the frontend
      res.json({ message: `Received your message: "${result}"` }); // Respond with the message
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

/*
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors
import { getOpenAIResponse } from './api/openai.js';  // Import the function from openai.js

dotenv.config();  // Load environment variables

const app = express();
const port = 5000;

console.log("Starting the server...");  // Early log to check if the server process starts

// Enable CORS for all origins (You can restrict this to specific domains later in production)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());  

// Example route for handling OpenAI requests
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  console.log("test 123 - inside of server.js");  // Check if this route is being hit
  try {
    // Get response from OpenAI by calling the function defined in openai.js
    const result = await getOpenAIResponse(messages);
    
    // Send the result back to the frontend
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

app.listen(port, () => {  // Start the server 
  console.log(`Backend server running at http://localhost:${port}`);
});
*/