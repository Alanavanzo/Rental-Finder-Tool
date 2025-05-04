import { getNearbyLocations } from '../api/googlePlaces';
import React from 'react';

const findSchools = async (geolocation) => {
      let simplifiedSchools; 
      try {
        const rawSchoolResults = await getNearbyLocations(`${geolocation.latitude},${geolocation.longitude}`,'school', 8000)//await getPlacesSearchResponse(searchQuery); 
        let schoolResults;
      
        // Check if rawSchoolResults is a string and needs to be parsed
        if (typeof rawSchoolResults === 'string') {
          schoolResults = JSON.parse(rawSchoolResults);
        } else {
          schoolResults = rawSchoolResults; // Use it directly if it's already an object
        }

        if (Array.isArray(schoolResults) && schoolResults.length > 0) {
          simplifiedSchools = schoolResults.map(school => ({
            name: school.name || "Unknown School",
            rating: school.rating || "No rating",
            userRatings: school.user_ratings_total || 0,
          }));
        } else {
          console.log("No schools found within the given radius.");
          simplifiedSchools = [];
        }
      } catch (error) {
        simplifiedSchools = [];
      } 
      console.log("Returning simplifiedSchools:", simplifiedSchools);
      return simplifiedSchools;
    };

export default findSchools;