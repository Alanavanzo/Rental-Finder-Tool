import React, { useEffect, useState } from 'react';

const Minimized_view = () => {

    useEffect(() => {
      const current_domain = window.location.hostname;  // get hostname 
      console.log("the current domain is: " + current_domain);
      if(current_domain == 'www.domain.com.au'){      // TODO also check that it is a property page
        console.log("in domain")
        callDomainForID();
      }
    }, []);
    
  const callDomainForID = async () => {
      console.log("inside call Domain for ID")
      try {
        // Make a POST request to your backend with the userInput in the body
        const response = await fetch(`http://localhost:3001/api/listingDetails`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log(response)
        if (!response.ok) {
          throw new Error("Error fetching data from backend");
        }
        const data = await response.json();
        console.log("Domain response received, printing next ...")
        console.log(data)
        //setPlacesResponse(data)
        //return data.message; // Assuming the response from backend contains a 'message'
      } catch (error) {
        //setPlacesResponse("error getting response")
        console.error("Error getting listing details:", error);
        throw error; // Propagate the error to be handled by the caller
      }
    }


  return (
    <div >
  </div>
  );
};

export default Minimized_view;
