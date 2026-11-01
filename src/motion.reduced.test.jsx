import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('scroll motion with prefers-reduced-motion: reduce', () => {
  beforeAll(() => {
    window.matchMedia = (query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    })
  })

  it('leaves the hero layers static', () => {
    const { container } = render(<App />)
    const layers = container.querySelectorAll('#hero [data-layer]')
    expect(layers).toHaveLength(4)
    for (const layer of layers) {
      expect(layer.style.transform).toBe('')
    }
  })

  it('renders destination cards visible straight away', () => {
    render(<App />)
    for (const card of screen.getAllByRole('article')) {
      expect(card.style.opacity).toBe('')
      expect(card.style.transform).toBe('')
    }
  })

  it('does not parallax the journey band background', () => {
    const { container } = render(<App />)
    expect(container.querySelector('[data-band-background]').style.transform).toBe('')
  })
})
