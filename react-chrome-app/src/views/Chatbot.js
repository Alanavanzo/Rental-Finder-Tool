import React, { useEffect, useState } from 'react';
import ChatComponent from "../components/Chat";

const Chatbot = () => {

  return (
    <div>
        <p>Chat with me!</p>
        <ChatComponent/>
        <p>Stay tuned .. chatbot coming soon</p>
    </div>
  );
};

// Export the component
export default Chatbot;