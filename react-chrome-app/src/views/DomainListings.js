import React, { useState, useEffect } from 'react';
import IndividualDomainRating from '../components/AutomaticDomainRating';
import halfStar from '../styling/images/halfStar.png'; // TODO -- remove
import ReactDOM from 'react-dom';  // Import ReactDOM to render inside an existing DOM
import PortalTest from '../components/PortalTest';

const Listings = () => {
  const [listings, setListings] = useState([]);

  // This function simulates fetching data from the DOM when the component mounts
  useEffect(() => {
    // Access the DOM elements and extract the listings
    const fetchedListings = [];
    
    // Wait for the component to mount, then access the DOM
    const listItems = document.querySelectorAll("#skip-link-content > div.css-e9rrvx > div.css-1vf6p5n > ul > li");

    // Loop through each listing and store relevant data
    listItems.forEach((listing) => {
      const listingId = listing.getAttribute('data-testid');  // Get the listing ID
      if (listingId && listingId.startsWith('listing-')) {
        const cleanListingId = listingId.replace('listing-', ''); // Remove the 'listing-' part    const newImage = document.createElement('img');
        fetchedListings.push({id: cleanListingId, dtid: listingId, cls: listing.getAttribute('class')});
        //ReactDOM.createPortal(<IndividualDomainRating propertyID={listing.id}/>)
        ReactDOM.createPortal(<PortalTest/>, listing)
      }
    });

    // Store the extracted data in the state
    setListings(fetchedListings);
  }, []); // Empty dependency array means it runs once after the component mounts 
/*
  const listingsOnPage = document.querySelectorAll("#skip-link-content > div.css-e9rrvx > div.css-1vf6p5n > ul > li");

  // Loop through each listing and add the word "hello"
  listingsOnPage.forEach((listing) => {
     const listingId = listing.getAttribute('data-testid');  // or another way to get the ID from the listing
      const newElement = document.createElement('div');  // Create a new <p> element
      newElement.innerHTML =  `<p>Some new HTML content here</p><p>More HTML elements</p>`;
      //newElement.textContent = listingId;  // Set the text content to "hello"
      listing.appendChild(newElement);  // Append the new <p> element to the listing
  });

  const firstThreeListings = listings.slice(0, 2); // TODO - make this visible listings

  firstThreeListings.forEach((listing) => {
    const targetElement = document.querySelector('[data-testid="listing-17507275"]');
    if(targetElement){
      ReactDOM.createPortal(<IndividualDomainRating propertyID={listing.id}/>)
    }
 });
*/
  return (
<div>
      {listings.map((listing) => {
        // Find the DOM element for the current listing
        const targetElement = document.querySelector(`[data-testid="listing-${listing.id}"]`);

        // Only create the portal if the target element exists
        if (targetElement) {
          return ReactDOM.createPortal(
            <IndividualDomainRating propertyID={listing.id}/>,
            //<PortalTest />, // Your Portal Component
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