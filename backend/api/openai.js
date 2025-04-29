import { OpenAI } from 'openai';
import dotenv from 'dotenv';        // loads environment variables (api key)

// Load environment variables from .env
dotenv.config();

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use your OpenAI API key securely from the .env file
});

export const getOpenAIResponse = async (messages) => {
  //return messages
    try {
      // Request to OpenAI's chat completions API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: messages,
        //messages: [
        //  { "role": "user", "content": messages },
        //],
      });
  
      // Log the completion to see what it returns
      console.log(completion);
      console.log(completion.choices[0].message);
  
      // Extract the message content
      //const messageContent = completion.choices[0].message.content;
  
      // Return the message content
      return completion.choices[0].message;  // Return the message instead of printing it
  
    } catch (error) {
      // Handle any errors
      console.log(messages)
      console.error("Error retrieving message:", error);
      return "Error occurred while fetching the message";
    }
  };


export const getOpenAIRating = async (messages) => {
  console.log("INSIDE backend getopenairating")
  //return messages
    try {
      // Request to OpenAI's chat completions API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        //response_format: "json",
        store: true,
        messages: [
          { 
            "role": "system", 
            "content": "Please respond consistently to property rating prompts based on the given details and user input. Always provide a rating on a scale from 0 to 5, with possible increments of 0.5 (e.g., 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5)."
          },
          { 
            "role": "user", 
            "content": messages // The variable containing the user input
          }
        ],
        temperature: 0,  // Ensuring deterministic responses
      });
  
      // Log the completion to see what it returns
      console.log(completion);
      console.log(completion.choices);
  
      // Extract the message content
      const messageContent = completion.choices[0].message.content;
  
      // Return the message content
      return messageContent;  // Return the message instead of printing it
  
    } catch (error) {
      // Handle any errors
      console.error("Error retrieving message:", error);
      return "Error occurred while fetching the message";
    }
  }

  /*
  try {
    // Request to OpenAI's chat completions API
    const completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content": "write a haiku about ai"},
      ],
    });
    console.log(completion)
    console.log(completion.choices)
    // Return the response object
    //return completion
    completion.then((result) => {
      // Extract the message content
      const messageContent = result.choices[0].message.content;
    
      // Return the message content
      return messageContent;  // Return the message instead of printing it
    }).catch((error) => {
      // Handle any errors
      console.error("Error retrieving message:", error);
      return "Error occurred while fetching the message";
    });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw new Error('Failed to get response from OpenAI');
  }
};
*/

