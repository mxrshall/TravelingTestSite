import { act, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

const expected = [
  ['Santorini', 'Greece', 'May to October', 'Sunset in Oia'],
  ['Kyoto', 'Japan', 'March to May and October to November', 'Arashiyama bamboo grove'],
  ['Patagonia', 'Argentina & Chile', 'November to March', 'Perito Moreno Glacier'],
  ['Iceland', 'Iceland', 'June to August', 'Golden Circle route'],
  ['Bali', 'Indonesia', 'April to October', 'Uluwatu temple at sunset'],
  ['Swiss Alps', 'Switzerland', 'December to March', 'Lake Lucerne cruise'],
]

function go(hash) {
  act(() => {
    window.location.hash = hash
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

describe('destination routing', () => {
  afterEach(() => {
    window.location.hash = ''
  })

  it.each(expected)('catalog card for %s leads to a page with its details', (name, country, best, highlight) => {
    render(<App />)
    const link = screen.getByRole('link', { name: `Explore ${name}, ${country}` })
    go(link.getAttribute('href'))
    expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument()
    expect(screen.getByText(new RegExp(best))).toBeInTheDocument()
    expect(screen.getByText(highlight)).toBeInTheDocument()
    expect(screen.queryByText(/destination not found/i)).not.toBeInTheDocument()
  })

  it('returns to the catalog via the back link', () => {
    render(<App />)
    go('#/destination/bali')
    go(screen.getByRole('link', { name: 'Back to destinations' }).getAttribute('href'))
    expect(screen.getByRole('region', { name: 'Featured destinations' })).toBeInTheDocument()
  })

  it('shows not-found instead of crashing on a malformed hash', () => {
    render(<App />)
    go('#/destination/%E0%A4%A')
    expect(screen.getByRole('heading', { name: /destination not found/i })).toBeInTheDocument()
  })

  it('accepts a trailing slash after the slug', () => {
    render(<App />)
    go('#/destination/kyoto/')
    expect(screen.getByRole('heading', { level: 1, name: 'Kyoto' })).toBeInTheDocument()
  })

  it('shows not-found inside the app for an unknown slug', () => {
    render(<App />)
    go('#/destination/atlantis')
    expect(screen.getByRole('heading', { name: /destination not found/i })).toBeInTheDocument()
    expect(within(screen.getByRole('main')).getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })
})
