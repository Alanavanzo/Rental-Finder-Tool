import React, { useState } from "react";
import { getChatResponse } from "../api/openai";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);
  /*
  React.useEffect(() => {
    fetch("http://localhost:3001/api/chat")
      .then((res) => res.json())
      .then((response) => setResponse(response.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!response ? "Loading..." : response}</p>
      </header>
    </div>
  );
  */
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sending request to backend ...")

    try {
      const messages = [
        { role: "user", content: userInput },
      ];
      fetch("http://localhost:3001/api/chat")
      .then((res) => res.json())
      .then((response) => setResponse(response.message));
      //const data = await getChatResponse(messages);
      //setResponse(data.message);
    } catch (error) {
      setResponse("Error getting response from backend.");
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
      {/*
      <p>{!response ? "Loading..." : response}</p>*/}
        
      {response && <div>Response: {response}</div>}
    </div>
  );

};

export default ChatComponent;
