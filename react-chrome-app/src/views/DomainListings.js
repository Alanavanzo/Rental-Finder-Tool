import React, { useState, useEffect } from 'react';
import IndividualDomainRating from '../components/AutomaticDomainRating';
import ReactDOM from 'react-dom';  // Import ReactDOM to render inside an existing DOM

const Listings = () => {
  const [ratingsList, setRatingsList] = useState(() => {
    const ratingsListLocal = localStorage.getItem("ratingsListStored")
      if (ratingsListLocal == null) return [] 
      return JSON.parse(ratingsListLocal)
  });

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
        
      if (targetElement) {
        // Try to find the carousel (which contains the image)
        const carousel = targetElement.querySelector('[data-testid="listing-card-price"]');//targetElement.querySelector('[data-testid="listing-card-carousel"]');

        let insertionPoint = targetElement; // default fallback

        if (carousel) {
          const existing = carousel.previousElementSibling;

          if (!existing || !existing.classList.contains('injected-rating-container')) {
            insertionPoint = document.createElement('div');
            insertionPoint.className = 'injected-rating-container';
            
            // 🔥 Insert above the price
            carousel.parentElement.insertBefore(insertionPoint, carousel);
          } else {
            // Already exists
            insertionPoint = existing;
          }
          // Try to insert immediately after the carousel
          /*
          const afterCarousel = carousel.nextElementSibling;

          if (afterCarousel && !afterCarousel.classList.contains('injected-rating-container')) {
            insertionPoint = document.createElement('div');
            insertionPoint.className = 'injected-rating-container';
            carousel.parentElement.insertBefore(insertionPoint, afterCarousel);
          } else if (!afterCarousel) {
            // If there's no sibling at all, just append the insertion point after carousel
            insertionPoint = document.createElement('div');
            insertionPoint.className = 'injected-rating-container';
            carousel.parentElement.appendChild(insertionPoint);
          } else {
            // Use the existing sibling as insertion point if it's already a container
            insertionPoint = afterCarousel;
          }
          */
        }
      
       // if (targetElement) {  // Only create the portal if the target element exists
        if (insertionPoint) {
          return ReactDOM.createPortal(
            <div style={{ fontSize: '0.8em', padding: '10px', transform: 'scale(0.8)', transformOrigin: 'top left'}}>
              <IndividualDomainRating propertyID={listing.id} ratingList={ratingsList}/>
            </div>
            ,
            insertionPoint//targetElement // The DOM element where the portal will be inserted
          );
        } else {
          return null;
        }
  }})}
    </div>
  );
};

export default Listings;