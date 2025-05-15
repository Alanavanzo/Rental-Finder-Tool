import React, { useEffect, useState } from 'react';
import { getNearbyLocations } from '../api/googlePlaces';
import SchoolList from './SchoolList';

const FacilitiesList = async ({geolocation}) => {
    const [parks, setParks] = useState();
    const [publicTransport, setPublicTransport] = useState();
    const [activities, setActivities] = useState();

    const [tempPlace, setTempPlace] = useState();

    useEffect(() => {
      if(geolocation){
      console.log("inside facilities list. Here is the geolocation - ", geolocation)
      setParks(findPlaces('park', 3000))
      }
      //setPublicTransport(findPlaces('public transport', 2000))
    }, [geolocation]);

    /*
    - placeType: location passed into GooglePlaces API
    - dist: radius in metres
    */
    const findPlaces = async (placeType, dist) => {
      let simplifiedPlace; 
      try {
        const rawPlaceResults = await getNearbyLocations(geolocation,placeType, dist)
        let placeResults;
        if (typeof rawPlaceResults === 'string') {
          placeResults = JSON.parse(rawPlaceResults);
        } else {
          placeResults = rawPlaceResults; 
        }
        if (Array.isArray(placeResults) && placeResults.length > 0) {
          simplifiedPlace = placeResults.map(place => ({
            name: place.name || "Unknown",
            rating: place.rating || "No rating",
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

    return (
      <div>
        <SchoolList schools={parks}/>
        <p>hellow we are printinf stuff here</p>
        {parks}
      </div>
    )
};

export default FacilitiesList;
