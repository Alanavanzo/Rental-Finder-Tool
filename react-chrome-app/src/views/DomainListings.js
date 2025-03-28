import React, { useState, useEffect } from 'react';
import IndividualDomainRating from '../components/AutomaticDomainRating';
import halfStar from '../styling/images/halfStar.png'; // TODO -- remove

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
        const halfStarURL = chrome.runtime.getURL(halfStar);
        const newImage = document.createElement('img');
        newImage.src = {halfStarURL}; // Replace with your image URL structure
        newImage.style.width = '60%'; // Optionally style the image
        
        // Append the image to the listing element
        listing.appendChild(newImage);

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
        <div key={listing.id} id={`listing-${listing.id}`} className="listing">
          {/* Render the IndividualDomainRating component */}
          <IndividualDomainRating propertyID={listing.id} />
        </div>
      ))}
    </div>
  );
};

export default Listings;