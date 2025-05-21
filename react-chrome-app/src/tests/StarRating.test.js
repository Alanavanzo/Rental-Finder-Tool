import { render, screen } from '@testing-library/react';
import StarRating from '../components/StarRating';  // Adjust path if needed

// Mock the chrome.runtime.getURL to return fake URLs for the star images
global.chrome = {
  runtime: {
    getURL: (path) => path,
  },
};

describe('StarRating Component', () => {
  test('displays no rating message when score is null', () => {
    render(<StarRating score={null} />);
    expect(screen.getByText('No rating available - try again later!')).toBeInTheDocument();
  });

  test('displays correct number of full, half, and empty stars for a whole number rating', () => {
    render(<StarRating score={4} />);

    const fullStars = screen.getAllByAltText('Full Star');
    const emptyStars = screen.getAllByAltText('Empty Star');

    expect(fullStars.length).toBe(4);  // 4 full stars
    expect(emptyStars.length).toBe(1);  // 1 empty star
  });

  test('displays correct number of full, half, and empty stars for a half number rating', () => {
    render(<StarRating score={4.5} />);

    const fullStars = screen.getAllByAltText('Full Star');
    const halfStars = screen.getAllByAltText('Half Star');

    expect(fullStars.length).toBe(4);  // 4 full stars
    expect(halfStars.length).toBe(1);  // 1 half star
  });

  test('displays correct number of full, half, and empty stars for a non-integer rating', () => {
    render(<StarRating score={3.5} />);

    const fullStars = screen.getAllByAltText('Full Star');
    const halfStars = screen.queryAllByAltText('Half Star');
    const emptyStars = screen.getAllByAltText('Empty Star');

    expect(fullStars.length).toBe(3);  // 3 full stars
    expect(halfStars.length).toBe(1);  // 1 half star
    expect(emptyStars.length).toBe(1);  // 1 empty star
  });

  test('displays correct number of full, half, and empty stars for a full rating', () => {
    render(<StarRating score={5} />);

    const fullStars = screen.getAllByAltText('Full Star');

    expect(fullStars.length).toBe(5);  // 5 full stars
  });
});
