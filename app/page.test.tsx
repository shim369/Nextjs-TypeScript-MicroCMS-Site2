import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import Home from './page';

const push = jest.fn();
jest.mock('next/navigation', () => {
  const router = jest.requireActual('next/navigation');
  return {
    ...router,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

global.scrollTo = jest.fn();

describe('Home', () => {
  test('renders home component', async () => {
    render(<Home />);

    await waitFor(() => {
      // Hero
      expect(screen.getByText('(Web Development)')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: 'Increasing Business Velocity through Technology' })).toBeInTheDocument();
      expect(screen.getByText('Welcome to NEXT BASE.')).toBeInTheDocument();
      expect(screen.getByText(/Your gateway to cutting-edge tech solutions/i)).toBeInTheDocument();

      // Index
      expect(screen.getByRole('heading', { level: 2, name: /What I do/i })).toBeInTheDocument();
      ['About', 'Service', 'Blog', 'FAQ'].forEach((title) => {
        expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
      });

      // Statement
      expect(screen.getByText('( Philosophy )')).toBeInTheDocument();

      // Contact
      expect(screen.getByRole('heading', { name: /Would you like to try the latest technology\?/i })).toBeInTheDocument();
      expect(screen.getByText(/contact/i)).toBeInTheDocument();
      expect(screen.getByText(/Name/i)).toBeInTheDocument();
      expect(screen.getByText(/Email/i)).toBeInTheDocument();
      expect(screen.getByText(/Message/i)).toBeInTheDocument();
      expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    });
  });
});
