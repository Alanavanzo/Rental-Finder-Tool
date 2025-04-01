import React, { useState, useEffect } from 'react';
import IndividualDomainRating from '../components/AutomaticDomainRating';
import ReactDOM from 'react-dom';  // Import ReactDOM to render inside an existing DOM

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(3);

  useEffect(() => {
    const fetchedListings = [];
    
    // Wait for the component to mount, then access the DOM
    const listItems = document.querySelectorAll("#skip-link-content > div.css-e9rrvx > div.css-1vf6p5n > ul > li");

    // Loop through each listing and store relevant data
    listItems.forEach((listing) => {
      const listingId = listing.getAttribute('data-testid');  // Get the listing ID
      if (listingId && listingId.startsWith('listing-')) {
        const cleanListingId = listingId.replace('listing-', ''); // Remove the 'listing-' part    const newImage = document.createElement('img');
        fetchedListings.push({id: cleanListingId, dtid: listingId, cls: listing.getAttribute('class')});
        console.log(listingId)
      }
    });
    setListings(fetchedListings);
  }, []); 

  const showNextThree = () => {
    setStart(start+3)
    setFinish(finish+3)
  };

  return (
<div>
      <button onClick={showNextThree}>
        Next 3
      </button>
      {listings.slice(start, finish).map((listing) => {
        const targetElement = document.querySelector(`[data-testid="listing-${listing.id}"]`);   // Find the DOM element for the current listing

        if (targetElement) {  // Only create the portal if the target element exists
          return ReactDOM.createPortal(
            <div style={{ fontSize: '0.8em', width: '80%', padding: '10px' }}>
              <IndividualDomainRating propertyID={listing.id}/>
            </div>
            ,
            targetElement // The DOM element where the portal will be inserted
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Listings;