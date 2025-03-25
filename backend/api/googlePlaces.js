
import axios from 'axios';
import dotenv from 'dotenv';        // loads environment variables (api key)

dotenv.config();  // Load environment variables from .env

//const axios = require('axios')

const apiKey = process.env.GOOGLE_API_KEY;

// Function to search for nearby places (e.g., restaurants) using the Google Places API
async function searchNearbyPlaces(location, radius = 5000, type = 'restaurant') {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const places = response.data.results;
    console.log('Found places:', places); // Log the found places
  } catch (error) {
    console.error('Error fetching places:', error.response ? error.response.data : error.message);
  }
}

// Example: Search for restaurants near New York City's coordinates
const location = '40.7128,-74.0060'; // New York City coordinates (latitude,longitude)

/*
// Function to dynamically load the Google Maps API
function loadGoogleMapsAPI(apiKey) {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initializeGooglePlacesClient`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Function to initialize the Google Places API client after the API is loaded
function initializeGooglePlacesClient() {
  console.log('Google Maps and Places API loaded successfully!');
  
  // Example of using the Places API (searching for restaurants near a location)
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  const request = {
    location: new google.maps.LatLng(40.7128, -74.0060), // New York City (use any lat/lng)
    radius: 5000, // Search radius in meters (e.g., 5 km)
    type: ['restaurant'], // Search for 'restaurant' places
  };

  // Perform the search and handle the results
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log('Found places:', results); // Logs the places found
    } else {
      console.error('Error finding places:', status); // Error handling
    }
  });
}
  */
 /*
async function loadGoogleMapsAPI(apiKey) {
  const google = await window.google.maps.importLibrary('places'); // Import Places library
  
  const map = new google.maps.Map(document.createElement('div'), {
    center: { lat: 40.7128, lng: -74.0060 }, // New York City
    zoom: 14,
  });

  const service = new google.maps.places.PlacesService(map);

  const request = {
    location: map.getCenter(),
    radius: 5000,
    type: ['restaurant'],
  };

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log('Found places:', results);
    } else {
      console.error('Error finding places:', status);
    }
  });
}
  */


// Function to search for places by text (e.g., "Tacos in Mountain View")

async function searchText(request) {
  const {
    textQuery,
    fields = [],
    includedType,
    locationBias,
    isOpenNow,
    language,
    maxResultCount,
    minRating,
    region,
    useStrictTypeFiltering,
  } = request;

  // Build the request URL with query parameters
  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  url.searchParams.append('query', textQuery);
  url.searchParams.append('key', apiKey);

  // Optional fields and filters
  if (fields.length) url.searchParams.append('fields', fields.join(','));
  if (includedType) url.searchParams.append('type', includedType);
  if (locationBias) url.searchParams.append('location', `${locationBias.lat},${locationBias.lng}`);
  if (isOpenNow !== undefined) url.searchParams.append('opennow', isOpenNow);
  if (language) url.searchParams.append('language', language);
  if (maxResultCount) url.searchParams.append('maxResults', maxResultCount);
  if (minRating) url.searchParams.append('minRating', minRating);
  if (region) url.searchParams.append('region', region);
  if (useStrictTypeFiltering !== undefined) url.searchParams.append('strictTypes', useStrictTypeFiltering);

  try {
    const response = await axios.get(url.toString());
    const places = response.data.results;
    console.log('Found places:', places); // Log the found places
    return places;
  } catch (error) {
    console.error('Error fetching places:', error.response ? error.response.data : error.message);
  }
}

async function searchTextQuery(query) {
  // Construct the request URL with the simple text query
  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  url.searchParams.append('query', query);
  url.searchParams.append('key', apiKey);

  try {
    const response = await axios.get(url.toString());
    const places = response.data.results;
    console.log('Found places:', places); // Log the found places
    return JSON.stringify(places);  // React can handle strings or arrays but NOT objects
  } catch (error) {
    console.error('Error fetching places:', error.response ? error.response.data : error.message);
  }
}

// Export the function using ES Modules
export { searchText, searchTextQuery, searchNearbyPlaces };

/*
async function searchText() {
  const query = "pizza in Hamilton, Queensland"
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const places = response.data.results;
    console.log('Found places for text search:', places); // Logs the found places
    return places
  } catch (error) {
    console.error('Error fetching places for text search:', error.response ? error.response.data : error.message);
  }
}
  */


/* CONNECTIONS TO FRONTENT AND SERVER WORK
export const searchText = async () => {
  //const {Place} = await google.maps.importLibrary("places");
  try {
    // Make a request to the Google Places API
    //const response = loadGoogleMapsAPI(process.env.GOOGLE_API_KEY); // Replace with your actual Google API key
    const response = searchNearbyPlaces(location);
    //const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
    //    params: {
    //        textQuery: '320 Macarthur AVenue',
    //        key: process.env.GOOGLE_API_KEY
    //    }
    //});
    return response.data;
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching data from Google Places API" });
  }
}
  */
// Export the function using CommonJS
