import React, { useEffect, useState } from 'react';
import { getNearbyLocations, getNearbyLocationsKeyword } from '../api/googlePlaces';

    const findPlaces = async (placeType, dist, geolocation, searchType) => {
      let simplifiedPlace; 
      try {
        let rawPlaceResults;
        if (searchType == "keyword"){
          rawPlaceResults = await getNearbyLocationsKeyword(geolocation,placeType, dist)
        }
        else{
          rawPlaceResults = await getNearbyLocations(geolocation,placeType, dist)
        }
        let placeResults;
        if (typeof rawPlaceResults === 'string') {
          placeResults = JSON.parse(rawPlaceResults);
        } else {
          placeResults = rawPlaceResults; 
        }
        if ( 
          Array.isArray(placeResults) && placeResults.length > 0
        ) {
          //simplifiedPlace = JSON.stringify(placeResults[0])
          simplifiedPlace = placeResults.map(place => ({
            name: place?.name || "Unknown",
            rating: place?.rating || "No rating",
          }));
        } else {
          console.log("No places found within the given radius.");
          simplifiedPlace = [];
        }
      } catch (error) {
        simplifiedPlace = [];
      } 
      return simplifiedPlace;
    };

    export default findPlaces;