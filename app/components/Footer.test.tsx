import React from 'react'
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom"
import { Footer } from './Footer'

describe('Footer', () => {
  test('renders footer text', () => {
    render(<Footer year={2026} />)
    const footerText = screen.getByText(/©.*NEXT BASE/i);
    expect(footerText).toBeInTheDocument();
  })
})