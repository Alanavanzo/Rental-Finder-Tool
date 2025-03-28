const API_URL = "http://localhost:3001/api";  // adjust when in prod


export const getListingData = async (propertyID) => {
  try {
    // Make a POST request to your backend with the userInput in the body
    const response = await fetch(`${API_URL}/listingDetails`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyID }), // Send the userInput as part of the body
    });
    console.log(response)

    if (!response.ok) {
      throw new Error("Error fetching data from backend");
    }
    const data = await response.json();
    console.log("Domain response received, printing next ...")
    console.log(data)
    // return data 
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};
