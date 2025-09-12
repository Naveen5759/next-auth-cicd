// create a test case to see if button is rendered on the page
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  it('renders a button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });
});
