import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('shows the Hello World heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Hello World' })).toBeInTheDocument()
  })
})
