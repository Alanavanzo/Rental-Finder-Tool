import React, { useState, useEffect } from 'react';
import IndividualDomainRating from '../components/AutomaticDomainRating';

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
        const cleanListingId = listingId.replace('listing-', ''); // Remove the 'listing-' part
        fetchedListings.push({ id: cleanListingId});  // Push the listing data into the array
      }
    });

    // Store the extracted data in the state
    setListings(fetchedListings);
  }, []); // Empty dependency array means it runs once after the component mounts 

  const firstThreeListings = listings.slice(0, 3); // TODO - make this visible listings

  return (
    <div>
      {firstThreeListings.map((listing) => (
        <div key={listing.id} className="listing">
          {/* Render the image for each listing */}
          {listing.id}
          <IndividualDomainRating propertyID={listing.id}/>
          Above is the rating
        </div>
      ))}
    </div>
  );
};

export default Listings;