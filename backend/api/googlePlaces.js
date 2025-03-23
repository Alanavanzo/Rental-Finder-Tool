// TODO - NOT IMPLEMENTED 
import axios from 'axios';
import dotenv from 'dotenv';        // loads environment variables (api key)

dotenv.config();  // Load environment variables from .env

export const searchText = async () => {
  try {
    // Make a request to the Google Places API
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
            textQuery: '320 Macarthur AVenue',
            key: process.env.GOOGLE_API_KEY
        }
    });
    return response.data;
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching data from Google Places API" });
  }
}
