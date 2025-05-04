import React from 'react';
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For `toBeInTheDocument`
// src/App.test.tsx
test('renders the button with the arrow symbol', () => {
  render(<App />);

  // Find the button element by role
  const button = screen.getByRole('button');

  // Check if the button contains the arrow symbol
  expect(button).toHaveTextContent('➡️');
});
/*
test('changes button text when clicked', () => {
  render(<App />);

  // Find the button element by role
  const button = screen.getByRole('button');

  // Simulate a click on the button
  fireEvent.click(button);

  // After the click, the button should contain "Minimized View"
  expect(button).toHaveTextContent('Minimized View');
})
  */
 