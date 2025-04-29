import React, { useEffect, useState } from 'react';
import ChatComponent from "../components/Chat";

const Chatbot = () => {

  return (
    <div>
        <span className='topicHeader'>Chat with me about your rental queries!</span>
        <ChatComponent/>
    </div>
  );
};

// Export the component
export default Chatbot;