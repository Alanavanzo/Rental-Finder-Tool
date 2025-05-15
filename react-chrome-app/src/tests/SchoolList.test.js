import { render, screen } from '@testing-library/react';
import SchoolList from '../components/SchoolList';

describe('SchoolList Component', () => {
    test('shows "No schools available" when no schools are passed', () => {
      render(<SchoolList schools={[]} />);
      expect(screen.getByText('No schools available.')).toBeTruthy();
    });
  
    test('displays a list of schools with their ratings', () => {
      const mockSchools = [
        { name: 'Greenwood High', rating: 4 },
        { name: 'Riverside Academy', rating: 5 }
      ];
  
      render(<SchoolList schools={mockSchools} />);
      
      // Check if school names and ratings are displayed
      mockSchools.forEach(school => {
        expect(screen.getByText(new RegExp(school.name, 'i'))).toBeTruthy(); // Flexible match
        expect(screen.getByText(new RegExp(`${school.rating}/5`, 'i'))).toBeTruthy(); // Flexible match
      });
    });
  
    test('shows "No schools available" when schools is undefined', () => {
      render(<SchoolList schools={undefined} />);
      expect(screen.getByText('No schools available.')).toBeTruthy();
    });
  });