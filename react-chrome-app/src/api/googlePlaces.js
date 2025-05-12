const API_URL = "http://localhost:3001/api";  // adjust when in prod

// Function to interact with the backend to get a single chat response
export const getPlacesSearchResponse = async (locationInput) => {
    console.log("inside of places call in frontend with this search query - ", locationInput)
    try {
        const response = await fetch(`${API_URL}/search`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locationInput }), // Send the userInput as part of the body
        });
        console.log(response)
        if (!response.ok) {
          throw new Error("Error fetching data from backend");
        }
        const data = await response.json();
        console.log("Google places response received, printing next ...", data)
        return data
      } catch (error) {
        setPlacesResponse("error getting response")
        console.error("Error in getChatResponse:", error);
        throw error; 
      }
};

export const getGeolocation = async (address) => {
  try {
      const response = await fetch(`${API_URL}/convertAddress`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({address}), // Send the userInput as part of the body
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Error fetching data from backend");
      }
      const data = await response.json();
      console.log("Google places response received, printing next ...", data)
      return data
    } catch (error) {
      setPlacesResponse("error getting response")
      console.error("Error in getGeolocation", error);
      throw error; 
    }
};

// Function to interact with the backend to get a single chat response
export const getNearbyLocations = async (geoLocation, type, radius) => {
  try {
      const response = await fetch(`${API_URL}/searchNearby`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ geoLocation, type, radius }), // Send the userInput as part of the body
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Error fetching data from backend");
      }
      const data = await response.json();
      console.log("Google places response received, printing next ...", data)
      return data
    } catch (error) {
      setPlacesResponse("error getting response")
      console.error("Error in getChatResponse:", error);
      throw error; 
    }
};