import React, { useEffect, useState } from 'react';
import { getUserRating } from "../api/openai";
import { getNearbyLocations } from '../api/googlePlaces';
import FacilitiesList from './FacilitiesList';
import findPlaces from './NearbyFacilities';
/*
import halfStar from '../styling/images/halfStar.png';
import fullStar from '../styling/images/fullStar.png';
import emptyStar from '../styling/images/emptyStar.png';
*/
import StarRating from './StarRating';

/*
A function which generates a property rating relative the the user.

This function takes property data as input to ensure that the code is extenable for various methods of retrieiving property data.
Hence, it is not reliant on an individual rental site to work, but can be leveraged when exten ding to an additional website.
It is currently being accessed from the rate tab in the sidebar, where users input data, and as a WIP being accessed from domain wider 
rental search pages.

Note that all use effects require checking trigger is not null, as this indicates it is not page load
In all other cases, the trigger is pulled when "generate rating" is selected
*/
const RatingGenerator = ({trigger=null, propertyDescription, propertyAddress, propertyID, detailedRating = false, automaticRating=false, propertyDetails="not provided", geolocation}) => {
    const [userRatingResponse, setUserRatingResponse] = useState()
    const [showRating, setShowRating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sameResponse, setSameResponse] = useState(false)
    const [localTrigger, setLocalTrigger] = useState(trigger)
    const [checkRatingListCount, setCheckRatingListCount] = useState(0);
    const [ratingsExists, setRatingExists] = useState(false);
    const [showDetailedRating, setShowDetailedRating] = useState(false)
    const [sustainabilityScore, setSustainabilityScore] = useState(-1)
    const [locationScore, setLocationScore] = useState(-1)
    const [facilityScore, setFacilityScore] = useState(-1)
    const [ratingSummary, setRatingSummary] = useState("NA");
    const [schoolsNearby, setSchoolsNearby] = useState(null);
    const [showSchools, setShowSchools] = useState(false);
    const [parksNearby, setParksNearby] = useState();

    console.log("printing geolocation - ", geolocation)


    // JUST ADDED
    //const [ratingsList, setRatingsList] = useState([]);
    const [ratingsList, setRatingsList] = useState(() => {
    
      const ratingsListLocal = localStorage.getItem("ratingsListStored")
        if (ratingsListLocal == null && ratingsListLocal!= []) return []
    
        return JSON.parse(ratingsListLocal)
    });

    useEffect(() => {
      if(trigger != null){
        setLocalTrigger(trigger)
      }
    }, [trigger]);

    useEffect(() => {
      if (
        locationScore !== -1 &&
        sustainabilityScore !== -1 &&
        facilityScore !== -1
      ) {
        setShowDetailedRating(true);
      }
    }, [locationScore, sustainabilityScore, facilityScore]);

    useEffect(() => {
      if(ratingsList != [] && ratingsList.length != 0){ // just added this 
        console.log("checking if a rating for this property has been generated")
        console.log(ratingsList)
        console.log(propertyAddress)
        const foundItem = ratingsList.find(ing => ing.property === propertyAddress || ing.property === propertyID);
        if(foundItem){
          const existingScore = foundItem.score;
          console.log("Found item with score:", existingScore);
          setRatingExists(true)
          setUserRatingResponse(existingScore)
          }
        else{
          console.log("no rating found")
          if(automaticRating){
            setLocalTrigger(true) // only generate rating if no rating is found 
          }
        }
        setCheckRatingListCount(checkRatingListCount+1)
        localStorage.setItem("ratingsListStored", JSON.stringify(ratingsList));   // TODO - is this even needed here???
        console.log(ratingsList)
      }
    }, [ratingsList]);

    // TODO override existing rating if a different rating is stored 
    function storeRating(propertyAddress, rating) {
      const isFoundInThisList = ratingsList.find(ing => ing.property === propertyAddress || ing.property === propertyID);
      const propID = propertyID ?? propertyAddress; // store by ID if available, otherwise use address
      //isFoundInThisList = ratingsList.some(ing => ing.property === propertyAddress); // will be true if link is already in list  
      if(!isFoundInThisList){
      setRatingsList((currentRatings) => {
          return [
              ...currentRatings,
              {id: crypto.randomUUID(), score: rating, property: propID, address: propertyAddress}
              //{id: crypto.randomUUID(), score: rating, property: propertyAddress}
          ]
      })
      console.log(ratingsList)
      localStorage.setItem("ratingsListStored", JSON.stringify(ratingsList));
      }
      else{
          return ("cannot store rating")        // cannot add .. return original list 
      }
      }

      // only generates rating if not in storage (pulls local trigger)
    useEffect(() => {
        if (localTrigger != null){
          console.log("Generating rating ...")
          generateRating(); //---> instead do use effect so it is only called after property details are retrieved from google maps API
        }
    }, [localTrigger]);

    // this needs to run if the rating changes OR if the generate rating button was selected but the score stays the same
    useEffect(() => {  
      if (localTrigger != null || ratingsExists){  
        console.log("show rating is true")
        setLoading(false)
        setShowRating(true)
      }
    }, [userRatingResponse, sameResponse]);// CHANGED THIS ON 25/4 as moving stars to seperate file [rating, sameResponse]);
    // now rating no changing here as this is handled by other file .. so score being updated is the indicator 

    useEffect(() => {    
      if (localTrigger != null || ratingsExists){
        if(userRatingResponse && (propertyAddress || propertyID)){
          storeRating(propertyAddress,userRatingResponse)
        }
        else{
          console.log("rating couldnt be generated :(") //setRating("Error generating rating :( enter more info or try again later");
        }
      }
    }, [userRatingResponse]); // this only needs to run if the rating score changes 

    const findSchools = async () => {
      let simplifiedSchools; 
      try {
        //const rawSchoolResults = await getNearbyLocations(`${geolocation.latitude},${geolocation.longitude}`,'school', 8000)//await getPlacesSearchResponse(searchQuery); 
        const rawSchoolResults = await getNearbyLocations(geolocation,'school', 8000)//await getPlacesSearchResponse(searchQuery); 
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
            //placeId: school.place_id || "",  // Optional: used for linking to Google Maps
          }));
          setSchoolsNearby(simplifiedSchools)
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

    const generateRating = async () => {
      const userRequirements = localStorage.getItem('userRequirements')
      const interactiveQuizAnswers = localStorage.getItem('quizUserPreferences')
      setShowRating(false)
      setLoading(true)
      console.log("inside generate rating function")

      let schoolData;

      if (userRequirements && userRequirements.toLowerCase().includes('school') && geolocation) {
        schoolData = await findSchools(); // You can await if it's async
      }
      if (geolocation)
      {
        const parks = await findPlaces('park', 3000, geolocation); // Await the result
        console.log("parks are as folllows ", parks)
        setParksNearby(parks); // Set the parksNearby state once data is retrieved
      }

      console.log("school data - ", schoolData)
      let schoolDataString = '';
      
      if (schoolData && Array.isArray(schoolData) && schoolData.length > 0) {
        const schoolSummaries = schoolData.map(s => `${s.name} (Rating: ${s.rating || 'N/A'})`);
        schoolDataString = ` Nearby schools include: ${schoolSummaries.join(', ')}.`;
      }

      try {
        console.log(propertyDetails)
        console.log("about to send prompt to OPEN AI")
        //const data = await getUserRating(propertyDescription, `My budget is $${String(budget)} per week. My requirements are: $${String(userRequirements)}. Here are my answers to a survey, they should tell you more about my preferences: ${String(interactiveQuizAnswers)}. I require ${String(numBeds)} bedrooms.`);
        const data = await getUserRating(propertyDescription, `This is the property info: ${String(propertyDetails)}.My requirements are: ${String(userRequirements)}. Here are my answers to a survey, they should tell you more about my preferences: ${String(interactiveQuizAnswers)}. ${schoolDataString}`);
        console.log("data retrieved from OPEN AI", data)
        const cleaned = data.replace(/```json|```/g, '').trim();
        const json_data = JSON.parse(cleaned);//JSON.parse(data);
        const { rating: scoreRating, location, facilities, sustainability, summary } = json_data;  // extract values
        if(detailedRating){
          setSustainabilityScore(sustainability)
          setLocationScore(location)
          setFacilityScore(facilities)
          setRatingSummary(summary)
        }
        if (scoreRating == userRatingResponse){
          setSameResponse(!sameResponse)
        }
        else{
          setUserRatingResponse(scoreRating); // Set the response message from the API
        }
      } catch (error) {
        console.log(("Error generating rating :( enter more info or try again later"))  //setRating("Error generating rating :( enter more info or try again later");
      }
    }
  
  
  return (
    <div>
      <br></br>
      {loading == true && <div className='ratingField'> loading ... </div> }
      {showRating == true && 
        <div>
          <StarRating
            score={userRatingResponse}
          />
        </div>
      }
      {showDetailedRating == true && 
        <div>
          <br></br>
          <p className='ratingField'>
            <strong>Location:</strong> {locationScore}/5
          </p>
          <p className='ratingField'>
            <strong>Facilities:</strong> {facilityScore}/5
          </p>
          <p className='ratingField'>
            <strong>Sustainability:</strong> {sustainabilityScore}/5
          </p>
          <br></br>
          <p className='centeredSmallText'>{ratingSummary}</p>
          <br></br>
          {schoolsNearby && (
            <>
              <button 
              className = 'buttonStyle' 
              onClick={() => setShowSchools(prev => !prev)}
              title='Display schools within an 8k radius'>
                {showSchools ? 'Hide Schools' : 'Show Schools'}
              </button>
              {showSchools && <FacilitiesList schools={schoolsNearby} type="schools" />}
              <FacilitiesList schools={parksNearby} type="parks" />
            </>
          )}
        </div>
      }
    </div>
  );
};

export default RatingGenerator;