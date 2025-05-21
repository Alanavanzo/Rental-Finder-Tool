import React from 'react';
import Listings from './DomainListings';
import IndividualDomainRating from '../components/AutomaticDomainRating';

const Minimized_view = () => {
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
    // Now add the word "hello" to each corresponding listing div
    /*
    const listingsOnPage = document.querySelectorAll("#skip-link-content > div.css-e9rrvx > div.css-1vf6p5n > ul > li");

    // Loop through each listing and add the word "hello"
    listingsOnPage.forEach((listing) => {
       const listingId = listing.getAttribute('data-testid');  // or another way to get the ID from the listing
        const newElement = document.createElement('p');  // Create a new <p> element
        newElement.textContent = listingId;  // Set the text content to "hello"
        listing.appendChild(newElement);  // Append the new <p> element to the listing
    });
    */

  return (
    <div >
    </div>
  );
};

export default Minimized_view;
