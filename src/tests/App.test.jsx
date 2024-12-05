import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Gift Card Generator')).toBeInTheDocument();
  });

  test('renders text input fields', () => {
    render(<App />);
    expect(screen.getByLabelText(/dear/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
  });

  test('handles text input change', () => {
    render(<App />);
    const dearInput = screen.getByLabelText(/dear/i);
    fireEvent.change(dearInput, { target: { value: 'John' } });
    expect(dearInput.value).toBe('John');
  });

  test('handles image upload', () => {
    render(<App />);
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(/upload image/i);
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText(/example.png/i)).toBeInTheDocument();
  });
});
