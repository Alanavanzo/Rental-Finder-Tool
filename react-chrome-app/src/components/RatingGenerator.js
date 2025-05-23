import React, { useEffect, useState } from 'react';
import { getUserRating } from "../api/openai";
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
    const [ptNearby, setPtNearby] = useState();
    const [showParks, setShowParks] = useState(false);
    const [showPt, setShowPt] = useState(false);
    const [foodNearby, setFoodNearby] = useState();
    const [showFood, setShowFood] = useState(false);

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
      const fetchPlaces = async () => {
        if (geolocation && geolocation != "") {
          try {
            const parks = await findPlaces('park', 3000, geolocation);
            setParksNearby(parks);  // Update state with the retrieved parks
          } catch (error) {
            console.log("Error fetching parks:", error);
          }
          try {
            const pt= await findPlaces('bus_station', 2000, geolocation);
            setPtNearby(pt);  // Update state with the retrieved parks
          } catch (error) {
            console.log("Error fetching PT:", error);
          }
          try {
            const food = await findPlaces('cafe|restaurant|bar', 3000, geolocation, "keyword");
            setFoodNearby(food);  
          } catch (error) {
            console.log("Error fetching PT:", error);
          }
        }
      };
      fetchPlaces();  // Call the async function
    }, [geolocation]);

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

    const generateRating = async () => {
      const userRequirements = localStorage.getItem('userRequirements')
      const interactiveQuizAnswers = localStorage.getItem('quizUserPreferences')
      setShowRating(false)
      setLoading(true)
      console.log("inside generate rating function")

      let schoolData;

      if (userRequirements && userRequirements.toLowerCase().includes('school') && geolocation) {
        schoolData = await findPlaces('school', 8000, geolocation);//findSchools(); // You can await if it's async
        setSchoolsNearby(schoolData)
      }

      console.log("school data - ", schoolData)
      let schoolDataString = '';
      let parkDataString = '';
      let foodDataString = '';
      
      if (schoolData && Array.isArray(schoolData) && schoolData.length > 0) {
        const schoolSummaries = schoolData.map(s => `${s.name} (Rating: ${s.rating || 'N/A'})`);
        schoolDataString = ` Nearby schools include: ${schoolSummaries.join(', ')}.`;
      }

      if (parksNearby && Array.isArray(parksNearby)) {
        const parkSummaries = parksNearby.map(s => `${s.name} (Rating: ${s.rating || 'N/A'})`);
        parkDataString = ` Nearby parks include: ${parkSummaries.join(', ')}.`;
      }

      if (foodNearby && Array.isArray(foodNearby)) {
        const foodSummaries = foodNearby.map(s => `${s.name} (Rating: ${s.rating || 'N/A'})`);
        foodDataString = ` Nearby cafes, bars and restaurants include: ${foodSummaries.join(', ')}.`;
      }

      try {
        console.log(propertyDetails)
        console.log("about to send prompt to OPEN AI")
        //const data = await getUserRating(propertyDescription, `My budget is $${String(budget)} per week. My requirements are: $${String(userRequirements)}. Here are my answers to a survey, they should tell you more about my preferences: ${String(interactiveQuizAnswers)}. I require ${String(numBeds)} bedrooms.`);
        const data = await getUserRating(propertyDescription, `This is the property info: ${String(propertyDetails)}. ${schoolDataString}. ${parkDataString}. ${foodDataString}.My requirements are: ${String(userRequirements)} These matter the most - especially budget and number of bedrooms as a property is not suitable if it does not fit into these. Here are my answers to a survey, they should tell you more about my preferences: ${String(interactiveQuizAnswers)}.`);
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
            </>
          )}
          <br></br>
          <button 
            className = 'buttonStyle' 
            onClick={() => setShowParks(prev => !prev)}
            title='Display parks within a 3k radius'>
            {showParks ? 'Hide Parks' : 'Show Parks'}
          </button>
          {showParks && <FacilitiesList schools={parksNearby} type="parks" />}
          <br></br>
          <br></br>
          <button 
            className = 'buttonStyle' 
            onClick={() => setShowPt(prev => !prev)}
            title='Display pt within a 2k radius'>
            {showPt ? 'Hide PT' : 'Show PT'}
          </button>
          {showPt && <FacilitiesList schools={ptNearby} type="public transport" />}
          <br></br>
          <br></br>
          <button 
            className = 'buttonStyle' 
            onClick={() => setShowFood(prev => !prev)}
            title='Display cafes, bars and rest within a 2k radius'>
            {showFood ? 'Hide Food' : 'Show Food'}
          </button>
          {showFood && <FacilitiesList schools={foodNearby} type="cafes, bar & commerce" />}
        </div>
      }
    </div>
  );
};

export default RatingGenerator;