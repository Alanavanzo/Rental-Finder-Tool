import React, { useState } from 'react';

// Define the functional component
const Hello = () => {
  //return <h1>Hello from JavaScript Functional Component!</h1>;
  return (
    <div>
      <h1>Controlled Textbox Example</h1>
      <input
        type="text"
        placeholder="Type something..."
      />
      {/*<p>You typed: {text}</p>*/}
    </div>
  );
};

// Export the component
export default Hello;