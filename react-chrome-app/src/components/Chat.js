import React, { useState } from "react";
import { getChatResponse } from "../api/openai";
import { getPlacesSearchResponse } from "../api/googlePlaces";

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
    event.preventDefault();
    try {
      const data = await getPlacesSearchResponse(searchQuery);  // Pass userInput directly
      setResponse(data); // Set the response message from the API
    } catch (error) {
      setResponse("Error getting response from backend google places API.");
    } finally {
      setLoading(false);  
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
