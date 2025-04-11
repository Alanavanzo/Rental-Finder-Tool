import React from 'react';
import { useEffect, useState } from 'react';
import Listings from './DomainListings';
import IndividualDomainRating from '../components/AutomaticDomainRating';

const ScrollRatings = () => {
    const [isDomainScroll, setDomainScroll] = useState(false)
    useEffect(() => {
        const current_domain = window.location.hostname; // get the hostname
        const current_path = window.location.pathname; // get the pathname
      
        console.log("The current domain is: " + current_domain);
        console.log("The current path is: " + current_path);
      
        // Check if the domain is 'www.domain.com.au' and the path starts with '/rent'
        if (current_domain === 'www.domain.com.au' && current_path.startsWith('/rent')) {
          console.log('The page is a property page under rent.');
          setDomainScroll(true)
        }
      }, []);
  /*
  // Create an empty array to store the listings data
  const listings = [];

  // Select all the <li> elements with the data-testid attribute
  const liElements = document.querySelectorAll('li[data-testid]');

  // Loop through each <li> and extract the necessary data
  liElements.forEach((li) => {
    // Get the 'data-testid' value from the li element
    const listingId = li.getAttribute('data-testid');
    
    // Extract the other details (image, address, and price)
    const imageUrl = li.querySelector('img') ? li.querySelector('img').src : null;
    const address = li.querySelector('.address') ? li.querySelector('.address').textContent : null;
    const price = li.querySelector('.css-mgq8yx') ? li.querySelector('.css-mgq8yx').textContent : null;
    
    // Push the extracted data into the listings array
    listings.push({
      listingID: listingId,
      imageURL: imageUrl,
      address: address,
      price: price
    });
  });

  // Now filter the listings for valid entries with a 'listing-' in the ID
  const filteredListings = listings.filter(listing => {
    // Check if the Listing ID contains 'listing-' and if the other fields are not null
    return listing.listingID && listing.listingID.includes('listing-') && listing.imageURL && listing.address && listing.price;
  });

  // Log the filtered listings to the console
  filteredListings.forEach(listing => {
    console.log(`Listing ID: ${listing.listingID}`);
    console.log(`Image URL: ${listing.imageURL}`);
    console.log(`Address: ${listing.address}`);
    console.log(`Price: ${listing.price}`);
  });
*/

  return (
    <div >
      {isDomainScroll && <Listings/>}
    </div>
  );
};

export default ScrollRatings;
