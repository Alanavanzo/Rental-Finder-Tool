import React, { useState } from "react";
import { getChatResponse } from "../api/openai";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [placesResponse, setPlacesResponse] = useState(null)
  
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

  const handleSubmit2 = async (event) => {
    console.log("Sending request to backend for google places API...");
    event.preventDefault();
    console.log("Sending request to backend for google places API...");
    try {
      // Make a POST request to your backend with the userInput in the body
      const response2 = await fetch(`http://localhost:3001/api/search`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(response2)
      if (!response2.ok) {
        throw new Error("Error fetching data from backend");
      }
      const data = await response2.json();
      console.log("Google places response received, printing next ...")
      console.log(data)
      setPlacesResponse(data)
      //return data.message; // Assuming the response from backend contains a 'message'
    } catch (error) {
      setPlacesResponse("error getting response")
      console.error("Error in getChatResponse:", error);
      throw error; // Propagate the error to be handled by the caller
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
      <h1>GOOGLE PLACES API TEST</h1>

      <form onSubmit={handleSubmit2}>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Ask me something (this is just a placeholder)..." 
        />
        <button type="submit">Call google places</button>
      </form>
      <p>{placesResponse}</p>
    </div>
  );

};

export default ChatComponent;
