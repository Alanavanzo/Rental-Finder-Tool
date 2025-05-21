import findPlaces from '../components/NearbyFacilities';
import { getNearbyLocations, getNearbyLocationsKeyword } from '../api/googlePlaces';

// Mock the imported API functions
jest.mock('../api/googlePlaces', () => ({
  getNearbyLocations: jest.fn(),
  getNearbyLocationsKeyword: jest.fn(),
}));

describe('findPlaces function', () => {
  const mockGeo = { lat: 0, lng: 0 };
  const dist = 1000;

  test('returns simplified place results for "type" search', async () => {
    const mockApiData = [
      { name: 'School A', rating: 4.3 },
      { name: 'School B', rating: 4.0 },
    ];
    getNearbyLocations.mockResolvedValue(mockApiData);

    const result = await findPlaces('school', dist, mockGeo, 'type');

    expect(result).toEqual([
      { name: 'School A', rating: 4.3 },
      { name: 'School B', rating: 4.0 },
    ]);
  });

  test('returns simplified place results for "keyword" search', async () => {
    const mockApiData = [
      { name: 'Library One', rating: 4.8 }
    ];
    getNearbyLocationsKeyword.mockResolvedValue(mockApiData);

    const result = await findPlaces('library', dist, mockGeo, 'keyword');

    expect(result).toEqual([
      { name: 'Library One', rating: 4.8 }
    ]);
  });

  test('returns empty array if no results are found', async () => {
    getNearbyLocations.mockResolvedValue([]);

    const result = await findPlaces('school', dist, mockGeo, 'type');

    expect(result).toEqual([]);
  });

  test('returns empty array if API throws error', async () => {
    getNearbyLocations.mockRejectedValue(new Error('Network error'));

    const result = await findPlaces('school', dist, mockGeo, 'type');

    expect(result).toEqual([]);
  });

  test('parses JSON string if API returns stringified response', async () => {
    const stringified = JSON.stringify([{ name: 'Parsed Place', rating: 4.6 }]);
    getNearbyLocations.mockResolvedValue(stringified);

    const result = await findPlaces('school', dist, mockGeo, 'type');

    expect(result).toEqual([{ name: 'Parsed Place', rating: 4.6 }]);
  });
});
