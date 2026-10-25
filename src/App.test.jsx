import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('shows the Travelsite title and tagline in the hero', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Travelsite' })).toBeInTheDocument()
    expect(screen.getByText("Discover the world's most breathtaking places")).toBeInTheDocument()
  })

  it('builds the hero from four separate layers, back to front', () => {
    const { container } = render(<App />)
    const layers = [...container.querySelectorAll('#hero [data-layer]')].map((el) => el.dataset.layer)
    expect(layers).toEqual(['sky', 'far', 'near', 'foreground'])
  })

  it('features six destination cards', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Featured destinations' })
    const cards = within(section).getAllByRole('article')
    expect(cards).toHaveLength(6)
    expect(within(section).getByRole('heading', { name: 'Kyoto' })).toBeInTheDocument()
  })

  it('has a journey band with a quote and a call to action back to the destinations', () => {
    const { container } = render(<App />)
    const band = container.querySelector('#journey')
    expect(within(band).getByText(/the world is a book/i)).toBeInTheDocument()
    expect(within(band).getByRole('link', { name: 'Start your journey' })).toHaveAttribute('href', '#destinations')
  })

  describe('nav', () => {
    it('links to every section by id, and every target exists', () => {
      const { container } = render(<App />)
      const nav = screen.getByRole('navigation')
      const hrefs = within(nav)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href'))
      expect(hrefs).toEqual(expect.arrayContaining(['#destinations', '#journey', '#contact']))
      for (const href of hrefs) {
        expect(container.querySelector(href)).not.toBeNull()
      }
    })

    it('opens and closes the mobile menu from the hamburger button', () => {
      render(<App />)
      const button = screen.getByRole('button', { name: 'Menu' })
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(screen.queryByRole('list', { name: 'Mobile menu' })).not.toBeInTheDocument()

      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')
      const menu = screen.getByRole('list', { name: 'Mobile menu' })
      expect(within(menu).getByRole('link', { name: 'Destinations' })).toHaveAttribute('href', '#destinations')

      fireEvent.click(within(menu).getByRole('link', { name: 'Destinations' }))
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('footer', () => {
    afterEach(() => vi.useRealTimers())

    it('shows the copyright line with the current year', () => {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date('2031-05-01'))
      render(<App />)
      expect(within(screen.getByRole('contentinfo')).getByText('© 2031 Travelsite')).toBeInTheDocument()
    })
  })
})
