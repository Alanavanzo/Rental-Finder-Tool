import React, { useState } from "react";
import { getChatResponse } from "../api/openai";
//import { getPlacesSearchResponse } from "../api/googlePlaces";

const ChatComponent = () => {
  const [interactiveQuizAnswers, setIntQuizAnsws] = useState(localStorage.getItem('quizUserPreferences'));
  const [userRequirements, setUserReqs] = useState(localStorage.getItem('userRequirements'));

  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    { role: "system", content: `You are a helpful assistant. Here is some backround info about me. My requirements are: ${String(userRequirements)}. Here are my answers to a survey, they should tell you more about my preferences: ${String(interactiveQuizAnswers)}.` }
  ]);

  console.log(messages)
  
  const handleSubmit = async (event) => {
    const userMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, userMessage];
    event.preventDefault();
    setLoading(true)

    try {
      const assistantObject = await getChatResponse(updatedMessages); // pass full history
      const newMessages = [...updatedMessages, assistantObject];
      console.log(assistantObject)
      setMessages(newMessages); // add assistant reply to history
      setResponse(assistantObject.content)

    } catch (error) {
      setResponse("Error getting response.");
    } finally {
      setLoading(false); 
      setUserInput("")
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

/*
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
      */
