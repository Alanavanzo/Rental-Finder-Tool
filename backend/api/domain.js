
import axios from 'axios';
import dotenv from 'dotenv';        // loads environment variables (api key)

dotenv.config();  // Load environment variables from .env

const apiKey = process.env.DOMAIN_API_KEY;

async function getListingDetails(id) {
    // Construct the request URL for Domain API with the listing ID
    const url = `https://api.domain.com.au/sandbox/v1/listings/${id}`;
    
    // Set up the headers required by the Domain API
    const headers = {
      'Accept': 'application/json',
      'X-Api-Key': apiKey,
      'X-Api-Call-Source': 'live-api-browser'
    };
  
    try {
      // Make the GET request with the required URL and headers
      const response = await axios.get(url, { headers });
      const listingDetails = response.data;  // Get the data from the response
      
      console.log('Listing details:', listingDetails); // Log the fetched listing details
      return JSON.stringify(listingDetails);  // Return data as a string if needed
    } catch (error) {
      console.log('Error fetching listing details for ', id)
      console.error('Error fetching listing details:', error.response ? error.response.data : error.message);
    }
  }

  export {getListingDetails}

  
  