/*
import { getUserRating } from "../api/openai";

// Mock the global fetch function
global.fetch = jest.fn();

describe('getUserRating function', () => {

  beforeEach(() => {
    // Clear any previous mock calls
    fetch.mockClear();
  });

  test('should return the rating response from the backend', async () => {
    // Mock the fetch response
    const mockResponse = {
      message: {
        rating: 4.5,
        location: 4,
        facilities: 4,
        sustainability: 5,
        summary: "The property is a good fit based on the user's preferences."
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const propertyInput = 'This is a beautiful house with a great view.';
    const userData = 'User prefers properties with good sustainability features.';
    
    const result = await getUserRating(propertyInput, userData);
    
    // Test that the function returns the expected data
    expect(result.rating).toBe(4.5);
    expect(result.location).toBe(4);
    expect(result.facilities).toBe(4);
    expect(result.sustainability).toBe(5);
    expect(result.summary).toBe("The property is a good fit based on the user's preferences.");
  });

  test('should throw an error if fetch fails', async () => {
    // Simulate a failed fetch
    fetch.mockRejectedValueOnce(new Error('Error fetching data from backend'));
    
    const propertyInput = 'Beautiful house with an open-plan kitchen.';
    const userData = 'User enjoys spacious homes with good lighting.';
    
    // Expect the function to throw an error
    await expect(getUserRating(propertyInput, userData)).rejects.toThrow('Error fetching data from backend');
  });

  test('should send the correct data in the POST request', async () => {
    // Mock the response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Rating received' }),
    });
    
    const propertyInput = 'Spacious apartment in the city center.';
    const userData = 'User is looking for a property close to public transport.';
    
    // Call the function
    await getUserRating(propertyInput, userData);
    
    // Test that the correct URL and body were used in the fetch request
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/ratingpost',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: `${userData}. Here is the description as listed on the rental website: ${propertyInput}. Based on this property and the info about me, please give a rating out of 5 to signify how much I would like this property. Try to look at the description factually as the writing has positive bias towards the property. Please respond only with a dict that have the overall rating mapped to "rating". And then other keys of "summary" which has value of 50 words explaining the personalised rating, then location, facilities and sustainability with ratings out of 5 that helped get the overall rating. In summary, the response dict should have the following keys: rating, location, facilities, sustainability, summary. The overall rating must reflect the information I have given you. Note that I only want ratings in increments of 0.5`,
        }),
      }
    );
  });

});
*/
