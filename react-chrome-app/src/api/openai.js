const API_URL = "http://localhost:3001/api";  // adjust when in prod

// Function to interact with the backend to get a single chat response
export const getChatResponse = async (userInput) => {
  try {
    // Make a POST request to your backend with the userInput in the body
    const response = await fetch(`${API_URL}/chatpost`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }), // Send the userInput as part of the body
    });

    if (!response.ok) {
      throw new Error("Error fetching data from backend");
    }

    const data = await response.json();
    return data.message; // Assuming the response from backend contains a 'message'
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};

export const getRatingValues = async (userInput) => {
  console.log(userInput)
  //const prompt = `Check out this link and let me know what you think: ${String(userInput)}`;
  // TODO add address in the input - along with core logic data 
  //const prompt = 'Give me ratings out of 10 for each of the following aspects for the following property details 320 Macarther avenue hamilton and let me know what you think. Each rating shpould be out of 10 and reflect the properties alignment with that aspect. Please do this for cooking, garden, nearby schools, etc.'
  
  const prompt = `Here are the details for a property I am looking at: ${String(userInput)}. Based on this property, please give me ratings out of 10 for each of the following factors - the rating should reflect how much the property aligns with that factor: cooking, garden, space, accessibility, comfort, maintenance, privacy, location, aesthetics. Please simply return a list in this format with no other text as I need it to be valid JSON: '{"cooking": a, "garden": b, "space": c, "accessibility": d, "comfort": e, "maintenance": f, "privacy": g, "location": h, "aesthetics": i}';`;
  
  console.log("PROMPT: " + prompt)
  try {
    // Make a POST request to your backend with the userInput in the body
    const response = await fetch(`${API_URL}/chatpost`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: prompt }), // Send the userInput as part of the body
    });

    if (!response.ok) {
      throw new Error("Error fetching data from backend");
    }

    const data = await response.json();
    return data.message; // Assuming the response from backend contains a 'message'
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};


export const getUserRating = async (propertyInput, userData) => {
  //const prompt = `This is some info about be: ${String(userData)}. Here are the details for a property I am looking at: ${String(propertyInput)}. Based on this property and the info about me, please give a rating out of 5 to signify how much I would like this property. Try to look at the description factually as the write has positive bias towards the property. Please respond only with a rating out of 5 (no additional text), which should be a rating which relfects what I have given you. Note that I only want ratings in increments of 0.5`;
  const prompt = `This is some info about be: ${String(userData)}. Here are the details for a property I am looking at: ${String(propertyInput)}. 
  Based on this property and the info about me, please give a rating out of 5 to signify how much I would like this property. Try to look at the 
  description factually as the write has positive bias towards the property. Please respond only with a dict that have the overall rating mapped to "rating". 
  And then other keys such as location, facilities and sustainability with ratings out of 5 that helped get the overall rating. THe overall rating should be 
  a rating which relfects what I have given you. Note that I only want ratings in increments of 0.5`;
  console.log("sending prompt ... ")
  //console.log("PROMPT: " + prompt)
  try {
    // Make a POST request to your backend with the userInput in the body
    const response = await fetch(`${API_URL}/ratingpost`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: prompt }), // Send the userInput as part of the body
    });

    if (!response.ok) {
      throw new Error("Error fetching data from backend");
    }

    const data = await response.json();
    return data.message; // Assuming the response from backend contains a 'message'
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};


// TODO - the result may not equal all combined avergae as the user cares about some things more than others.
export const getLayeredRating = async (propertyInput, userData) => {
  const prompt = `This is some info about be: ${String(userData)}. Here are the details for a property I am looking at: ${String(propertyInput)}. 
  Based on this property and the info about me, please give a rating out of 5 to signify how much I would like this property. Try to look at the 
  description factually as the write has positive bias towards the property. Please respond only with an overall ratinging out of 5 (no additional text)
  as well as individual ratings for sustainability, nearby facilities, and the rental property itself in a dict with each type of rating as the key and the 
  number as the value. The overall rating should be a result of the all of them combined and reflect what I have given you. Note that I only want ratings in 
  increments of 0.5`;
  console.log("sending prompt ... ")
  //console.log("PROMPT: " + prompt)
  try {
    // Make a POST request to your backend with the userInput in the body
    const response = await fetch(`${API_URL}/ratingpost`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: prompt }), // Send the userInput as part of the body
    });

    if (!response.ok) {
      throw new Error("Error fetching data from backend");
    }

    const data = await response.json();
    return data.message; // Assuming the response from backend contains a 'message'
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};


/*
// TODO - this is a WIP and is not currently being used anywhere 
// Function to interact with the backend to get a property rating response with separate scores for each aspect
// TODO also take in array of what we care about
export const getRatingValues = async (propertyLink) => {

  // todo, loop through what the user cares abour more than a 2 and add to list to pass into API

  try {
    // Create a context-rich message with user ratings and property link

    // to do - or maybe just ask for a general rating of each aspect and use that to relate with what the user has said
    const message = {
      prompt: `The user is looking at a property at the following link: ${propertyLink}. They have rated the following:

      Please evaluate the suitability of this property for the following factors and provide a suitability score out of 5 for each of the following aspects:
      - Cooking NOTE THIS WILL BE THE USER CARE FACTORS 
      - Garden
      - Parking

      Provide each aspect's score separately, like this:
      - Cooking: X/5
      - Garden: Y/5
      - Parking: Z/5
      `,
    };

    const response = await fetch(`${API_URL}/chatpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),  // Send the context and user ratings
    });

    if (!response.ok) {
      throw new Error("Error fetching data from backend");
    }

    const data = await response.json();
    return data.message; // Assuming the AI's response is in the 'message' field
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};
*/
