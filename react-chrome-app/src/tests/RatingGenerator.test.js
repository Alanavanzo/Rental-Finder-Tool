import { render, screen } from '@testing-library/react';
import RatingGenerator from '../components/RatingGenerator';

// Mock chrome - as it will be running there 
global.chrome = {
  runtime: {
    getURL: (path) => path,
  },
};

describe('RatingGenerator Component', () => {
  it('displays rating from localStorage when property ID exists', async () => {
    // Insert a property and its rating into localStorage
    const propertyID = 'abc123'; 
    const rating = 4.5; 
    const propertyData = {
      id: 123456789, 
      score: rating,
      property: propertyID,
      address: '123 Main St',
    };

    // Insert the property data into localStorage
    localStorage.setItem('ratingsListStored', JSON.stringify([propertyData]));

    // Render RatingGenerator with property inserted into local storage
    render(
      <RatingGenerator
        trigger={true}
        propertyDescription="Nice place"
        propertyAddress="123 Main St"
        propertyID={propertyID}
        detailedRating={false}
        automaticRating={false}
        propertyDetails="3 bedroom, 2 bath"
        geolocation={{ latitude: 40.7128, longitude: -74.006 }}
      />
    );

    // Verify the rating by checking for 4.5 star images
    const fullStars = screen.getAllByAltText('Full Star');
    const halfStar = screen.getByAltText('Half Star');
    
    expect(fullStars).toHaveLength(4); 
    expect(halfStar).toBeInTheDocument(); 
  });
});
