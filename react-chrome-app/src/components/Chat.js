import React, { useState, useEffect } from "react";
import { getChatResponse } from "../api/openai";
//import { getPlacesSearchResponse } from "../api/googlePlaces";

const ChatComponent = () => {
  const [interactiveQuizAnswers, setIntQuizAnsws] = useState(localStorage.getItem('quizUserPreferences'));
  const [userRequirements, setUserReqs] = useState(localStorage.getItem('userRequirements'));
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fresh_convo = [
    { role: "system", 
      content: `You are a helpful assistant. Here is some backround info about me. My requirements are: ${String(userRequirements)}. Here are my answers to a survey, they should tell you more about my preferences: ${String(interactiveQuizAnswers)}.` },
    {
      role: "assistant",
      content: "Hi there! I'm here to help you find the perfect property based on your preferences. Feel free to ask me anything — I already know what you're looking for!"
    }
  ]

  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('chatMessages');
    return stored ? JSON.parse(stored) : fresh_convo;
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (event) => {
    const userMessage = { role: "user", content: userInput };
    event.preventDefault();

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];
      fetchAssistantResponse(updatedMessages);  // After adding user message, make the API request 
      return updatedMessages;  // Return the updated state to React
    });

    setUserInput("");
  };

  const resetConversation = async (event) => {
    setMessages(fresh_convo);
    setUserInput("");
  };

  const fetchAssistantResponse = async (updatedMessages) => {
    setLoading(true);  // Start loading animation
    try {
      const assistantObject = await getChatResponse(updatedMessages); // Make API request with the updated messages array
      setMessages((prevMessages) => [...prevMessages, assistantObject]);  // Update the messages with the assistant's response
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, {role: "assistant", content: "Sorry - I am unable to respond to your question right now :("}]);
    } finally {
      setLoading(false);  // Stop loading animation
    }
  };

  const dotStyle = (i) => ({
    animation: `blink 1.4s infinite both`,
    animationDelay: `${i * 0.2}s`,
    fontSize: "20px",
    marginRight: "2px"
  });

  return (
    <div>
      <div style={{ marginTop: "20px", maxHeight: "60vh", overflowY: "auto" }}>
        {messages
          .filter((msg) => msg.role !== "system") // hide the system message
          .map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px"
              }}
            >
              <div
                style={{
                  backgroundColor: msg.role === "user" ? "#dcf8c6" : "#f1f0f0",
                  color: "#000",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "70%",
                  wordWrap: "break-word"
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "10px",
              animation: "fadeIn 0.3s ease"
            }}
          >
            <div
              style={{
                backgroundColor: "#f1f0f0",
                color: "#000",
                padding: "10px 15px",
                borderRadius: "10px",
                maxWidth: "70%",
                fontStyle: "italic",
                display: "inline-block"
              }}
            >
              <span style={dotStyle(0)}>.</span>
              <span style={dotStyle(1)}>.</span>
              <span style={dotStyle(2)}>.</span>
            </div>
          </div>
          )}
      </div>
      <form 
        onSubmit={handleSubmit}
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "10px", 
          marginTop: "20px" 
        }}
      >
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Ask me something..." 
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <button 
          type="submit"
          style={{
            padding: "10px 15px",
            fontSize: "18px",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          🚀
        </button>
      </form>

      {/* Place this outside the form */}
      <br></br>
      <div className="tooltip-container">
        <button 
          onClick={resetConversation}
          className="info-icon"
        >
          🔄
        </button>
        <div className="tooltip-text">Select to start a new convo😊</div>
      </div>

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
