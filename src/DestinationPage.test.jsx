import { render, screen } from '@testing-library/react'
import DestinationPage from './DestinationPage.jsx'

describe('DestinationPage', () => {
  it('shows the full details of the destination with the matching slug', () => {
    render(<DestinationPage slug="kyoto" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Kyoto' })).toBeInTheDocument()
    expect(screen.getByText('Japan')).toBeInTheDocument()
    expect(screen.getByText(/best time to visit/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /highlights/i })).toBeInTheDocument()
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument()
  })

  it('links back to the destinations on the homepage', () => {
    render(<DestinationPage slug="kyoto" />)
    expect(screen.getByRole('link', { name: 'Back to destinations' })).toHaveAttribute('href', '#/')
  })

  it('shows a friendly not-found message with a link home for an unknown slug', () => {
    render(<DestinationPage slug="atlantis" />)
    expect(screen.getByRole('heading', { name: /destination not found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '#/')
  })
})
