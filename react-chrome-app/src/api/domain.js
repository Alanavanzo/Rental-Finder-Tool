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
    const result = await response.json();
    console.log("Domain response received")
    return result
  } catch (error) {
    console.log("Error in getListingData:", error);
    //throw error; // Propagate the error to be handled by the caller
  }
};
