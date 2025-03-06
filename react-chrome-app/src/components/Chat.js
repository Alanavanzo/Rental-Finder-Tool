import React, { useState } from "react";
import { getChatResponse } from "../api/openai";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sending request to backend ...");
    setLoading(true)

    try {
      // Call the API via getChatResponse with the userInput
      const data = await getChatResponse(userInput);  // Pass userInput directly
      setResponse(data); // Set the response message from the API

    } catch (error) {
      setResponse("Error getting response from backend.");
    } finally {
      setLoading(false);  // Set loading to false once the response is received
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Ask me something..." 
        />
        <button type="submit">Submit</button>
      </form>
    
      {loading && (
        <div style={{ width: '100%', backgroundColor: '#f3f3f3', padding: '5px', marginTop: '10px' }}>
          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#4caf50',
              animation: 'loading 2s infinite',
            }}
          ></div>
        </div>
      )}
        
      {response && <div>Response: {response}</div>}
    </div>
  );

};

export default ChatComponent;
