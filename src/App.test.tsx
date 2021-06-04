import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders footer text', () => {
  render(<App />);
  const linkElement = screen.getByText(/financing provided by fairstone/i);
  expect(linkElement).toBeInTheDocument();
});
