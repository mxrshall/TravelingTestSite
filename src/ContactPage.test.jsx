import { act, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

function goTo(hash) {
  act(() => {
    window.location.hash = hash
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

describe('contact subpage', () => {
  afterEach(() => {
    window.location.hash = ''
  })

  it('shows the homepage by default, without the contact page', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Travelsite' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 1, name: 'Contact us' })).not.toBeInTheDocument()
  })

  it('shows contact details at #/contact', () => {
    window.location.hash = '#/contact'
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Contact us' })).toBeInTheDocument()
    const main = screen.getByRole('main')
    expect(within(main).getByRole('link', { name: 'hello@travelsite.example' })).toHaveAttribute(
      'href',
      'mailto:hello@travelsite.example',
    )
    expect(within(main).getByRole('link', { name: '+1 (555) 010-2030' })).toHaveAttribute('href', 'tel:+15550102030')
    expect(within(main).getByText(/42 Wanderer Lane/)).toBeInTheDocument()
    expect(within(main).getByText(/Mon–Fri/)).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Featured destinations' })).not.toBeInTheDocument()
  })

  it('switches between pages when the hash changes', () => {
    render(<App />)
    goTo('#/contact')
    expect(screen.getByRole('heading', { level: 1, name: 'Contact us' })).toBeInTheDocument()
    goTo('#/')
    expect(screen.getByRole('heading', { level: 1, name: 'Travelsite' })).toBeInTheDocument()
  })

  it('links to the contact page from the nav and back home from the contact page', () => {
    render(<App />)
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#/contact')
    goTo('#/contact')
    expect(within(screen.getByRole('navigation')).getByRole('link', { name: 'Travelsite' })).toHaveAttribute('href', '#/')
  })
})
