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
    console.log("Domain response received, printing next ...")
    console.log(result)
    return result
    // Extracting the required information
    //const pricePerWeek = result.priceDetails.price; // Price is already in weekly format
    //const address = result.addressParts.displayAddress;
    //const description = result.description;
    //const bedrooms = result.bedrooms;
    //const geolocation = result.geoLocation;
    //const carspaces = result.carspaces;
    //const bathrooms = result.bathrooms;
    //const propertyType = result.propertyTypes[0]; // Assumes there's at least one property type

    /*
        console.log("Price per Week:", pricePerWeek);
    console.log("Address:", address);
    console.log("Description:", description);
    console.log("Bedrooms:", bedrooms);
    console.log("Geolocation:", geolocation);
    console.log("Carspaces:", carspaces);
    console.log("Bathrooms:", bathrooms);
    console.log("Property Type:", propertyType);
    */
    // return data 
  } catch (error) {
    console.error("Error in getListingData:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};
